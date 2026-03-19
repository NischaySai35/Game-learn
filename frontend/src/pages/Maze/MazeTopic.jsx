import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { getTopicById } from '../../api/courseApi'
import { useGame } from '../../context/GameContext'

import pandaImage from '../../assets/panda.png'
import bamboo from '../../assets/bamboo.png'
import rock from '../../assets/rock.png'
import river from '../../assets/river.png'
import bridge from '../../assets/bridge.png'
import hill from '../../assets/hill.png'
import bushes from '../../assets/bushes.png'
import cave from '../../assets/cave.png'

import styles from './MazeTopic.module.css'

export default function MazeTopic() {
  const { courseId, topicId } = useParams()
  const navigate = useNavigate()
  const { addXP, addCoins } = useGame()

  const [topic, setTopic] = useState(null)
  const [nodes, setNodes] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [feedback, setFeedback] = useState('')
  const [answered, setAnswered] = useState(false)

  // ✅ SHRUNK WIDTH + INCREASED HEIGHT
  const path = [
    { x: 50, y: 360 },
    { x: 130, y: 140 },
    { x: 230, y: 360 },
    { x: 330, y: 140 },
    { x: 430, y: 360 },
    { x: 530, y: 140 },
    { x: 630, y: 360 },
  ]

  const getNodeImage = (index) => {
    const map = [
      bamboo,
      rock,
      river,
      bridge,
      hill,
      bushes,
      cave
    ]
    return map[index]
  }

  useEffect(() => {
    const load = async () => {
      const { data } = await getTopicById(courseId, topicId)
      setTopic(data)
      setNodes(data.nodes)
    }
    load()
  }, [courseId, topicId])

  const currentNode = nodes[currentIndex]

  const handleContinue = () => {
    setFeedback('Good progress — continue ahead')
    setTimeout(() => {
      setCurrentIndex(prev => prev + 1)
      setFeedback('')
      setAnswered(false)
    }, 500)
  }

  const handleAnswer = (opt) => {
    if (answered) return

    if (opt === currentNode.answer) {
      setFeedback('Correct — keep going')
      addXP(20)
      addCoins(5)
      setTimeout(() => {
        setCurrentIndex(prev => prev + 1)
        setFeedback('')
        setAnswered(false)
      }, 600)
    } else {
      setFeedback('Try again')
      setAnswered(true)
    }
  }

  if (!topic) return <div className={styles.loading}>Loading...</div>

  return (
    <div className={styles.page}>
      <h1>{topic.title} Maze</h1>

      <div className={styles.container}>

        {/* 🌿 PATH */}
        <div className={styles.pathArea}>

          {/* CONNECTORS */}
          {path.slice(0, -1).map((point, index) => {
            const next = path[index + 1]
            const dx = next.x - point.x
            const dy = next.y - point.y
            const length = Math.sqrt(dx * dx + dy * dy)
            const angle = Math.atan2(dy, dx) * (180 / Math.PI)

            return (
              <div
                key={index}
                className={styles.connector}
                style={{
                  left: point.x,
                  top: point.y,
                  width: length,
                  transform: `rotate(${angle}deg)`
                }}
              />
            )
          })}

          {/* NODES */}
          {nodes.map((node, index) => (
            <div
              key={index}
              className={`${styles.node} ${currentIndex >= index ? styles.active : ''}`}
              style={{ left: path[index]?.x, top: path[index]?.y }}
            >
              <img
                src={getNodeImage(index)}
                alt="node"
                className={styles.nodeImage}
              />
            </div>
          ))}

          {/* PANDA */}
          <motion.img
            src={pandaImage}
            className={styles.panda}
            animate={{
              left: path[currentIndex]?.x,
              top: path[currentIndex]?.y
            }}
            transition={{ type: 'spring', stiffness: 120 }}
          />

        </div>

        {/* PANEL */}
        <div className={styles.panel}>
          
          {currentNode?.type === 'explanation' && (
            <>
              <h3>Explanation</h3>
              <p>{currentNode.content}</p>
              <button onClick={handleContinue}>Continue →</button>
            </>
          )}

          {currentNode?.type === 'mcq' && (
            <>
              <h3>Task: Help Panda to proceed</h3>
              <p>{currentNode.question}</p>
              {currentNode.options.map(opt => (
                <button key={opt} onClick={() => handleAnswer(opt)}>
                  {opt}
                </button>
              ))}
            </>
          )}

          {currentNode?.type === 'finish' && (
            <>
              <h2>Panda reached home! Completed {topic.title}</h2>
              <button onClick={() => navigate('/dashboard')}>
                Back to Dashboard
              </button>
            </>
          )}

          {feedback && <p className={styles.feedback}>{feedback}</p>}
        </div>

      </div>
    </div>
  )
}