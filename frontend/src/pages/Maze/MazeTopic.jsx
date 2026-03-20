import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { getTopicById } from '../../api/courseApi'
import { useGame } from '../../context/GameContext'
import styles from './MazeTopic.module.css'

export default function MazeTopic() {
  const { courseId, topicId } = useParams()
  const navigate = useNavigate()
  const { addXP, addCoins, completeCourse } = useGame()

  const [topic, setTopic] = useState(null)
  const [loading, setLoading] = useState(true)
  const [explanationSetIndex, setExplanationSetIndex] = useState(0)
  const [pointIndex, setPointIndex] = useState(0)
  const [quizIndex, setQuizIndex] = useState(0)
  const [showQuiz, setShowQuiz] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [feedback, setFeedback] = useState('')
  const [totalXP, setTotalXP] = useState(0)
  const [isCompleted, setIsCompleted] = useState(false)

  // Character position (0-10 scale based on progress)
  const maxProgress = 10
  const currentProgress = explanationSetIndex * 3 + pointIndex + (quizIndex * 1)
  const progressPercent = (currentProgress / maxProgress) * 100

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await getTopicById(courseId, topicId)
        setTopic(data)
      } catch (error) {
        console.error('Error loading topic:', error)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [courseId, topicId])

  const getCurrentExplanationSet = () => {
    return topic?.explanationSets?.[explanationSetIndex]
  }

  const getCurrentPoint = () => {
    const set = getCurrentExplanationSet()
    return set?.points?.[pointIndex]
  }

  const getCurrentQuiz = () => {
    return topic?.quizzes?.[quizIndex]
  }

  const handleNextPoint = () => {
    addXP(2)
    setTotalXP(prev => prev + 2)
    setFeedback('✨ +2 XP')
    
    setTimeout(() => {
      setFeedback('')
      
      if (pointIndex < 2) {
        setPointIndex(prev => prev + 1)
      } else {
        setShowQuiz(true)
        setPointIndex(0)
      }
    }, 600)
  }

  const handlePreviousPoint = () => {
    if (pointIndex > 0) {
      setPointIndex(prev => prev - 1)
    }
  }

  const handleAnswerQuiz = (optionIndex) => {
    const quiz = getCurrentQuiz()
    if (selectedAnswer !== null) return

    setSelectedAnswer(optionIndex)

    if (optionIndex === quiz.correctAnswer) {
      setFeedback('✅ Correct! +10 XP')
      addXP(10)
      setTotalXP(prev => prev + 10)

      setTimeout(() => {
        setFeedback('')
        
        if (quizIndex < 2) {
          setQuizIndex(prev => prev + 1)
          setExplanationSetIndex(prev => prev + 1)
          setShowQuiz(false)
          setPointIndex(0)
          setSelectedAnswer(null)
        } else {
          setIsCompleted(true)
          completeCourse(topic.title)
          addXP(50)
          setTotalXP(prev => prev + 50)
        }
      }, 1500)
    } else {
      setFeedback('❌ Incorrect! Try another option.')
      setTimeout(() => {
        setFeedback('')
        setSelectedAnswer(null)
      }, 1000)
    }
  }

  if (loading) return <div className={styles.loading}>Loading...</div>
  if (!topic) return <div className={styles.loading}>Topic not found</div>

  const currentSet = getCurrentExplanationSet()
  const currentPoint = getCurrentPoint()
  const currentQuiz = getCurrentQuiz()

  return (
    <div className={styles.mazeContainer}>
      <div className={styles.header}>
        <h1>📚 {topic.title}</h1>
        <div className={styles.statsBar}>
          <div className={styles.xpDisplay}>⭐ {totalXP} XP</div>
          <div className={styles.progressBar}>
            <div 
              className={styles.progressFill} 
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <div className={styles.stepCount}>
            {currentProgress + 1} / {maxProgress}
          </div>
        </div>
      </div>

      <div className={styles.content}>
        
        {/* LEFT: Character Animation */}
        <div className={styles.characterBox}>
          <motion.div 
            className={styles.characterContainer}
            animate={{ x: progressPercent }}
            transition={{ type: 'spring', stiffness: 100 }}
          >
            <div className={styles.character}>
              <span className={styles.bear}>🐻</span>
              <div className={styles.trail} style={{ width: `${progressPercent}%` }} />
            </div>
          </motion.div>
          <div className={styles.startEnd}>
            <span>Start</span>
            <span>Finish</span>
          </div>
        </div>

        {/* MIDDLE: Navigation & Quiz */}
        <div className={styles.mainContent}>
          {!showQuiz ? (
            <div className={styles.explanationContainer}>
              <div className={styles.explanationBox}>
                <h2>{currentSet?.title}</h2>
                <p className={styles.explanationText}>{currentPoint}</p>
              </div>

              <div className={styles.navigationButtons}>
                <button
                  className={styles.arrowBtn}
                  onClick={handlePreviousPoint}
                  disabled={pointIndex === 0 && explanationSetIndex === 0}
                >
                  ← Previous
                </button>
                <span className={styles.pointIndicator}>
                  Point {pointIndex + 1}/3
                </span>
                <button
                  className={styles.arrowBtn}
                  onClick={handleNextPoint}
                >
                  Next →
                </button>
              </div>

              <AnimatePresence>
                {feedback && (
                  <motion.div
                    className={styles.feedbackMessage}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                  >
                    {feedback}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <div className={styles.quizContainer}>
              <h2>📝 Quick Quiz {quizIndex + 1}/3</h2>
              <p className={styles.quizQuestion}>{currentQuiz?.question}</p>

              <div className={styles.optionsGrid}>
                {currentQuiz?.options.map((option, idx) => (
                  <motion.button
                    key={idx}
                    className={`${styles.optionBtn} ${
                      selectedAnswer === idx
                        ? idx === currentQuiz.correctAnswer
                          ? styles.correct
                          : styles.incorrect
                        : ''
                    }`}
                    onClick={() => handleAnswerQuiz(idx)}
                    disabled={selectedAnswer !== null}
                    whileHover={{ scale: selectedAnswer === null ? 1.05 : 1 }}
                    whileTap={{ scale: selectedAnswer === null ? 0.95 : 1 }}
                  >
                    {option}
                  </motion.button>
                ))}
              </div>

              {currentQuiz?.explanation && selectedAnswer !== null && (
                <motion.div
                  className={styles.explanation}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <strong>Explanation:</strong> {currentQuiz.explanation}
                </motion.div>
              )}

              <AnimatePresence>
                {feedback && (
                  <motion.div
                    className={styles.feedbackMessage}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                  >
                    {feedback}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>

        {/* RIGHT: Progress Points & Completion */}
        <div className={styles.rightPanel}>
          {isCompleted ? (
            <motion.div
              className={styles.completionBox}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 100 }}
            >
              <div className={styles.celebrationEmoji}>🎉</div>
              <h2>Course Completed!</h2>
              <p className={styles.completionStats}>
                <strong>Topic:</strong> {topic.title}
              </p>
              <p className={styles.completionStats}>
                <strong>Total XP Earned:</strong> {totalXP} ⭐
              </p>
              <button
                className={styles.nextBtn}
                onClick={() => navigate('/dashboard')}
              >
                Back to Dashboard
              </button>
            </motion.div>
          ) : (
            <motion.div
              className={styles.infoBox}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <h3>Learning Points</h3>
              <ul className={styles.pointsList}>
                {currentSet?.points.map((point, idx) => (
                  <li
                    key={idx}
                    className={`${styles.point} ${
                      idx <= pointIndex ? styles.active : ''
                    }`}
                  >
                    <span className={styles.pointBullet}>
                      {idx < pointIndex ? '✅' : idx === pointIndex ? '▶' : '◯'}
                    </span>
                    <span className={styles.pointText}>Point {idx + 1}</span>
                  </li>
                ))}
              </ul>

              <div className={styles.progressSection}>
                <h4>Set Progress</h4>
                <div className={styles.miniProgress}>
                  <div
                    className={styles.miniFill}
                    style={{ width: `${((explanationSetIndex + 1) / 3) * 100}%` }}
                  />
                </div>
                <p>
                  Explanation Set {explanationSetIndex + 1}/3
                </p>
              </div>

              <div className={styles.helpText}>
                💡 Tip: Click "Next" to see the next point. After 3 points, you'll take a quiz!
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}