import React, { useEffect, useState, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { getTopicById } from '../../api/courseApi'
import { useGame } from '../../context/GameContext'
import styles from './MazeTopic.module.css'

const GRID_WIDTH = 7
const GRID_HEIGHT = 5

const buildMazeGrid = (nodes) => {
  const grid = Array.from({ length: GRID_HEIGHT }, () =>
    Array.from({ length: GRID_WIDTH }, () => ({ type: 'empty', hasNode: false, node: null, hasPickup: false }))
  )

  const pathItems = nodes.map((node, index) => ({
    ...node,
    x: index % GRID_WIDTH,
    y: Math.floor(index / GRID_WIDTH),
  }))

  pathItems.forEach(item => {
    grid[item.y][item.x] = { type: 'path', hasNode: true, node: item, hasPickup: false }
  })

  for (let y = 0; y < GRID_HEIGHT; y += 1) {
    for (let x = 0; x < GRID_WIDTH; x += 1) {
      if (grid[y][x].type === 'empty') {
        if (Math.random() < 0.15) {
          grid[y][x].type = 'wall'
        } else if (Math.random() < 0.12) {
          grid[y][x].hasPickup = true
        }
      }
    }
  }

  return { grid, pathItems }
}

export default function MazeTopic() {
  const { courseId, topicId } = useParams()
  const navigate = useNavigate()
  const { recordLearningSession, addXP, addCoins, completeCourse } = useGame()
  const [topic, setTopic] = useState(null)
  const [loading, setLoading] = useState(true)
  const [mazeGrid, setMazeGrid] = useState([])
  const [checkpoints, setCheckpoints] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [player, setPlayer] = useState({ x: 0, y: 0 })
  const [answered, setAnswered] = useState(false)
  const [feedback, setFeedback] = useState('')
  const [completed, setCompleted] = useState(false)

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await getTopicById(courseId, topicId)
        setTopic(data)
        const { grid, pathItems } = buildMazeGrid(data.nodes)
        setMazeGrid(grid)
        setCheckpoints(pathItems)
        setPlayer({ x: pathItems[0].x, y: pathItems[0].y })
        setCurrentIndex(0)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [courseId, topicId])

  const currentNode = checkpoints[currentIndex]
  const nextGoal = checkpoints[currentIndex + 1]

  const tryAdvance = useCallback((dx, dy) => {
    if (completed) return
    const newX = player.x + dx
    const newY = player.y + dy

    if (newX < 0 || newX >= GRID_WIDTH || newY < 0 || newY >= GRID_HEIGHT) {
      setFeedback('Cannot move outside the maze bounds.')
      return
    }

    const target = mazeGrid[newY]?.[newX]
    if (!target || target.type === 'wall') {
      setFeedback('Blocked by a wall - find another route.')
      return
    }

    if (target.hasPickup) {
      addCoins(7)
      setFeedback('Pickup found! +7 coins')
      const updatedGrid = mazeGrid.map((row, yy) => row.map((cell, xx) => {
        if (yy === newY && xx === newX) return { ...cell, hasPickup: false }
        return cell
      }))
      setMazeGrid(updatedGrid)
    }

    const newPos = { x: newX, y: newY }
    setPlayer(newPos)

    if (nextGoal && newPos.x === nextGoal.x && newPos.y === nextGoal.y) {
      setCurrentIndex(idx => idx + 1)
      setFeedback('Checkpoint reached! Keep going.')
      setAnswered(false)
    }
  }, [player, completed, mazeGrid, nextGoal, addCoins])

  useEffect(() => {
    const handleKeyDown = (e) => {
      const map = { ArrowUp: [0, -1], ArrowDown: [0, 1], ArrowLeft: [-1, 0], ArrowRight: [1, 0] }
      if (map[e.key]) {
        const [dx, dy] = map[e.key]
        tryAdvance(dx, dy)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [tryAdvance])

  useEffect(() => {
    if (!topic || !checkpoints.length || completed) return
    if (currentIndex === checkpoints.length - 1) {
      setCompleted(true)
      addXP(120)
      addCoins(40)
      recordLearningSession(25)
      if (topic.title && topic.title.toLowerCase().includes('react')) {
        completeCourse('React Fundamentals')
      }
    }
  }, [currentIndex, checkpoints, topic, completed, addXP, addCoins, recordLearningSession, completeCourse])

  const handleAnswer = (option) => {
    if (!currentNode || currentNode.type !== 'mcq' || answered) return
    if (option === currentNode.answer) {
      setFeedback('Correct! Keep going.')
      addXP(20)
      addCoins(5)
    } else {
      setFeedback('Incorrect. Try another path hit later.')
    }
    setAnswered(true)
  }

  if (loading) return <div className={styles.loading}>Loading maze...</div>
  if (!topic) return <div className={styles.loading}>Topic not found</div>

  return (
    <div className={styles.mazePage}>
      <section className={styles.header}>
        <h1>{topic.title} Maze</h1>
        <p>Use arrow keys to navigate; reach each checkpoint in order.</p>
      </section>

      <main className={styles.mazeGridWrap}>
        <div className={styles.grid} style={{ gridTemplateColumns: `repeat(${GRID_WIDTH}, 1fr)` }}>
          {mazeGrid.flatMap((row, y) => row.map((cell, x) => {
            const isPlayer = player.x === x && player.y === y
            const isNext = nextGoal && nextGoal.x === x && nextGoal.y === y
            let content = ''
            if (cell.type === 'wall') content = '⛰️'
            else if (cell.hasPickup) content = '💎'
            else if (cell.hasNode) {
              content = cell.node.type === 'finish' ? '🏁' : cell.node.type === 'explanation' ? '📘' : '🧠'
            }
            return (
              <div key={`${x}-${y}`} className={`${styles.cell} ${isPlayer ? styles.player : ''} ${isNext ? styles.nextNode : ''} ${cell.type === 'wall' ? styles.wall : ''}`}>
                {content}
              </div>
            )
          }))}
        </div>

        <aside className={styles.panel}>
          <h2>Current Node</h2>

          {currentNode?.type === 'explanation' && <p>{currentNode.content}</p>}

          {currentNode?.type === 'mcq' && (
            <div className={styles.mcqArea}>
              <p><strong>{currentNode.question}</strong></p>
              {currentNode.options.map(opt => (
                <button key={opt} disabled={answered} onClick={() => handleAnswer(opt)}>{opt}</button>
              ))}
            </div>
          )}

          {currentNode?.type === 'finish' && <p>🎉 Maze complete! Well done.</p>}

          <div className={styles.footerInfo}>
            <p>{completed ? '✅ Topic completed' : `Progress: ${Math.min(currentIndex + 1, checkpoints.length)}/${checkpoints.length}`}</p>
            {feedback && <p className={styles.feedback}>{feedback}</p>}
            <div className={styles.moveButtons}>
              <button onClick={() => tryAdvance(0, -1)}>↑</button>
              <button onClick={() => tryAdvance(0, 1)}>↓</button>
              <button onClick={() => tryAdvance(-1, 0)}>←</button>
              <button onClick={() => tryAdvance(1, 0)}>→</button>
            </div>
            <button onClick={() => navigate('/dashboard')} className={styles.backBtn}>Back to Dashboard</button>
          </div>
        </aside>
      </main>
    </div>
  )
}
