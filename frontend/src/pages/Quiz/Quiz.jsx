import React, { useState, useMemo, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useGame } from '../../context/GameContext'
import { mockQuizBank } from '../../api/mockData'
import styles from './Quiz.module.css'

const randomSample = (arr, n) => [...arr].sort(() => 0.5 - Math.random()).slice(0, n)

export default function Quiz() {
  const { addXP, addCoins, addNotification, user, unlockAchievement } = useGame()
  const [mode, setMode] = useState('normal')
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState({})
  const [showResult, setShowResult] = useState(false)
  const [peerScores, setPeerScores] = useState([])
  const [feedback, setFeedback] = useState('')
  const [attemptKey, setAttemptKey] = useState(0)
  const [startTime, setStartTime] = useState(Date.now())

  const questions = useMemo(() => {
    const qlist = mockQuizBank.flatMap(item => item.questions)
    return randomSample(qlist, 5)
  }, [mode, attemptKey])

  useEffect(() => {
    setCurrentQuestionIndex(0)
    setSelectedAnswers({})
    setShowResult(false)
    setPeerScores([])
    setFeedback('')
    setStartTime(Date.now())
  }, [mode])

  const handleAnswer = (qId, option) => {
    if (showResult) return

    setSelectedAnswers(prev => ({ ...prev, [qId]: option }))
    setFeedback(option === questions[currentQuestionIndex].answer ? 'Correct!' : 'Incorrect, keep going.')

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(curr => curr + 1)
    } else {
      setTimeout(() => setShowResult(true), 250)
    }
  }

  const correctCount = questions.filter(q => selectedAnswers[q.id] === q.answer).length
  const scorePercent = questions.length ? Math.round((correctCount / questions.length) * 100) : 0

  const giveRewards = () => {
    if (mode === 'normal') {
      const xpGain = 50 + correctCount * 15
      const coinGain = 20 + correctCount * 8
      addXP(xpGain)
      addCoins(coinGain)
      if (scorePercent === 100) {
        unlockAchievement(4)
      }
      return { xpGain, coinGain }
    }

    const ranking = 100 - scorePercent + Math.floor(Math.random() * 20)
    const placement = ranking < 40 ? 1 : ranking < 70 ? 2 : 3
    const coins = placement === 1 ? 120 : placement === 2 ? 80 : 50
    const xp = placement === 1 ? 120 : placement === 2 ? 85 : 50
    addXP(xp)
    addCoins(coins)
    const list = [{ name: user.name, score: scorePercent }, { name: 'Lily', score: 95 }, { name: 'Rahul', score: 92 }, { name: 'Asha', score: 85 }]
    setPeerScores(list)
    return { placement, xp, coins, list }
  }

  const handleFinish = () => {
    const summary = giveRewards()
    const elapsedMinutes = Math.max(5, Math.round((Date.now() - startTime) / 60000))
    recordLearningSession(elapsedMinutes)

    addNotification(`Quiz complete! Score ${scorePercent}%. Logged ${elapsedMinutes}m.`, 'success')
    if (mode === 'peer' && summary?.placement === 1) {
      unlockAchievement(4)
      addNotification('Top ranking in peer challenge! 🥇', 'success')
    }
  }

  return (
    <div className={styles.quizPage}>
      <div className={styles.header}>
        <h1>Quiz Arena</h1>
        <p>Choose mode and test your skills for rewards</p>
      </div>

      <div className={styles.modeButtons}>
        <button className={mode === 'normal' ? styles.active : ''} onClick={() => setMode('normal')}>Normal Mode</button>
        <button className={mode === 'peer' ? styles.active : ''} onClick={() => setMode('peer')}>Peer Competition</button>
      </div>

      {!showResult ? (
        <motion.div key={mode} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h2>{questions[currentQuestionIndex]?.question}</h2>
          <div className={styles.answerGrid}>
            {questions[currentQuestionIndex]?.options.map(opt => (
              <button key={opt} onClick={() => handleAnswer(questions[currentQuestionIndex].id, opt)}>{opt}</button>
            ))}
          </div>
          <p>{`Question ${currentQuestionIndex + 1} / ${questions.length}`}</p>
          {currentQuestionIndex === questions.length - 1 && (
            <button onClick={handleFinish} className={styles.finishButton}>Finalize</button>
          )}
        </motion.div>
      ) : (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className={styles.results}>
          <h2>Your score: {scorePercent}%</h2>
          <p>{correctCount} / {questions.length} correct</p>
          {mode === 'peer' && (
            <div className={styles.leaderboard}
            >
              <h3>Leaderboard</h3>
              {[...peerScores, { name: user.name, score: scorePercent }]
                .sort((a, b) => b.score - a.score)
                .map((p, idx) => (
                  <div key={p.name} className={styles.leaderRow}>
                    <span>#{idx + 1}</span>
                    <span>{p.name}</span>
                    <span>{p.score}%</span>
                  </div>
                ))}
            </div>
          )}
          <button
            onClick={() => {
              setAttemptKey(prev => prev + 1)
              setCurrentQuestionIndex(0)
              setSelectedAnswers({})
              setShowResult(false)
              setPeerScores([])
              setFeedback('')
              setStartTime(Date.now())
            }}
            className={styles.retryButton}
          >
            Try Again
          </button>
        </motion.div>
      )}
    </div>
  )
}
