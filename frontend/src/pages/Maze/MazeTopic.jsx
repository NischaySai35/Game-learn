import React, { useEffect, useState, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { getTopicById } from '../../api/courseApi'
import { useGame } from '../../context/GameContext'
import styles from './MazeTopic.module.css'

// Character choices
const CHARACTERS = [
  { id: 'bear', emoji: '🐻', name: 'Bear', color: '#8B4513' },
  { id: 'ninja', emoji: '🥷', name: 'Ninja', color: '#000' },
  { id: 'robot', emoji: '🤖', name: 'Robot', color: '#C0C0C0' },
  { id: 'unicorn', emoji: '🦄', name: 'Unicorn', color: '#FF69B4' },
  { id: 'dragon', emoji: '🐉', name: 'Dragon', color: '#FF6347' },
]

// Power-ups
const POWER_UPS = [
  { id: 'double_xp', emoji: '2️⃣', name: 'Double XP', effect: 'Double next reward' },
  { id: 'streak_boost', emoji: '⚡', name: 'Streak Boost', effect: 'Keep streak on wrong answer' },
  { id: 'hint', emoji: '💡', name: 'Hint', effect: 'Eliminate wrong answer' },
]

// Achievements
const ACHIEVEMENTS = [
  { id: 'first_run', emoji: '🏁', name: 'First Steps', condition: 'Complete maze once' },
  { id: 'perfect_quiz', emoji: '💯', name: 'Perfect Score', condition: 'Get all quizzes correct' },
  { id: 'speedrun', emoji: '🚀', name: 'Speed Demon', condition: 'Complete in under 3 minutes' },
  { id: 'streak_master', emoji: '🔥', name: 'Streak Master', condition: '3+ correct streak' },
  { id: 'combo_king', emoji: '👑', name: 'Combo King', condition: 'Land 5x combo' },
]

export default function MazeTopic() {
  const { courseId, topicId } = useParams()
  const navigate = useNavigate()
  const { addXP, addCoins, completeCourse } = useGame()

  // Game state
  const [topic, setTopic] = useState(null)
  const [loading, setLoading] = useState(true)
  const [selectedCharacter, setSelectedCharacter] = useState('bear')
  const [characterSelectOpen, setCharacterSelectOpen] = useState(false)

  // Learning state
  const [explanationSetIndex, setExplanationSetIndex] = useState(0)
  const [pointIndex, setPointIndex] = useState(0)
  const [quizIndex, setQuizIndex] = useState(0)
  const [showQuiz, setShowQuiz] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [feedback, setFeedback] = useState('')

  // Gamification state
  const [totalXP, setTotalXP] = useState(0)
  const [streak, setStreak] = useState(0)
  const [combo, setCombo] = useState(0)
  const [activePowerUps, setActivePowerUps] = useState([])
  const [unlockedAchievements, setUnlockedAchievements] = useState([])
  const [showConfetti, setShowConfetti] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)
  const [elapsedTime, setElapsedTime] = useState(0)
  const startTimeRef = useRef(null)

  // Progress calculation
  const maxProgress = 10
  const currentProgress = explanationSetIndex * 3 + pointIndex + (quizIndex * 1)
  const progressPercent = (currentProgress / maxProgress) * 100

  // Load topic
  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await getTopicById(courseId, topicId)
        setTopic(data)
        startTimeRef.current = Date.now()
      } catch (error) {
        console.error('Error loading topic:', error)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [courseId, topicId])

  // Timer
  useEffect(() => {
    if (isCompleted) return
    const interval = setInterval(() => {
      setElapsedTime(Math.floor((Date.now() - startTimeRef.current) / 1000))
    }, 1000)
    return () => clearInterval(interval)
  }, [isCompleted])

  // Check achievements
  useEffect(() => {
    const newAchievements = []
    if (currentProgress === 1) newAchievements.push('first_run')
    if (combo >= 5) newAchievements.push('combo_king')
    if (streak >= 3) newAchievements.push('streak_master')
    
    newAchievements.forEach(ach => {
      if (!unlockedAchievements.includes(ach)) {
        setUnlockedAchievements([...unlockedAchievements, ach])
        playSound('achievement')
      }
    })
  }, [combo, streak, currentProgress, unlockedAchievements])

  // Sound effect hook
  const playSound = (type) => {
    // Sound effect hooks ready for audio implementation
    // Types: click, success, error, achievement, levelup, confetti
    console.log('🔊 Sound:', type)
  }

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
    playSound('click')
    
    let xpGain = 2
    if (activePowerUps.includes('double_xp')) {
      xpGain = 4
      setActivePowerUps(activePowerUps.filter(p => p !== 'double_xp'))
    }

    addXP(xpGain)
    setTotalXP(prev => prev + xpGain)
    setCombo(prev => prev + 1)
    setFeedback(`✨ +${xpGain} XP (+${combo + 1}x Combo)`)
    
    playSound('success')

    setTimeout(() => {
      setFeedback('')
      
      if (pointIndex < 2) {
        setPointIndex(prev => prev + 1)
      } else {
        // Check if this is the final quiz (boss quiz)
        const isBossQuiz = quizIndex === 2
        setShowQuiz(true)
        if (isBossQuiz) {
          setFeedback('🏆 Final Boss Quiz Incoming!')
        }
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

    playSound('click')
    setSelectedAnswer(optionIndex)

    if (optionIndex === quiz.correctAnswer) {
      const isBossQuiz = quizIndex === 2
      let xpGain = isBossQuiz ? 25 : 10

      if (activePowerUps.includes('double_xp')) {
        xpGain = xpGain * 2
        setActivePowerUps(activePowerUps.filter(p => p !== 'double_xp'))
      }

      const newStreak = streak + 1
      const streakBonus = newStreak > 1 ? newStreak * 2 : 0

      addXP(xpGain + streakBonus)
      setTotalXP(prev => prev + xpGain + streakBonus)
      setStreak(newStreak)
      setCombo(prev => prev + 1)

      playSound('success')
      setFeedback(`✅ Correct! +${xpGain + streakBonus} XP 🔥x${newStreak}`)

      setTimeout(() => {
        setFeedback('')
        
        if (quizIndex < 2) {
          setQuizIndex(prev => prev + 1)
          setExplanationSetIndex(prev => prev + 1)
          setShowQuiz(false)
          setPointIndex(0)
          setSelectedAnswer(null)
        } else {
          // COURSE COMPLETED!
          setIsCompleted(true)
          completeCourse(topic.title)
          addXP(75) // Completion bonus
          setTotalXP(prev => prev + 75)
          setShowConfetti(true)
          playSound('levelup')
          
          // Check speedrun achievement
          if (elapsedTime < 180) {
            if (!unlockedAchievements.includes('speedrun')) {
              setUnlockedAchievements([...unlockedAchievements, 'speedrun'])
            }
          }
        }
      }, 1500)
    } else {
      setStreak(0)
      playSound('error')
      setFeedback('❌ Incorrect. Try again!')
      
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
  const character = CHARACTERS.find(c => c.id === selectedCharacter)

  return (
    <div className={styles.mazeContainer}>
      {/* HEADER */}
      <div className={styles.header}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <h1>📚 {topic.title}</h1>
          <motion.button
            className={styles.characterBtn}
            onClick={() => setCharacterSelectOpen(!characterSelectOpen)}
            whileHover={{ scale: 1.1 }}
          >
            {character.emoji} {character.name}
          </motion.button>
        </div>

        <div className={styles.statsBar}>
          <div className={styles.stat}>
            <span className={styles.label}>⭐ XP</span>
            <span className={styles.value}>{totalXP}</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.label}>🔥 Streak</span>
            <span className={styles.value}>{streak}</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.label}>👑 Combo</span>
            <span className={styles.value}>{combo}x</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.label}>⏱️ Time</span>
            <span className={styles.value}>{Math.floor(elapsedTime / 60)}:{(elapsedTime % 60).toString().padStart(2, '0')}</span>
          </div>
          <div className={styles.progressBar}>
            <div 
              className={styles.progressFill} 
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <div className={styles.stepCount}>{currentProgress + 1} / {maxProgress}</div>
        </div>
      </div>

      {/* CHARACTER SELECTOR */}
      <AnimatePresence>
        {characterSelectOpen && (
          <motion.div
            className={styles.characterSelector}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <h3>Choose Your Character:</h3>
            <div className={styles.characterGrid}>
              {CHARACTERS.map(char => (
                <motion.button
                  key={char.id}
                  className={`${styles.charOption} ${selectedCharacter === char.id ? styles.selected : ''}`}
                  onClick={() => {
                    setSelectedCharacter(char.id)
                    setCharacterSelectOpen(false)
                  }}
                  whileHover={{ scale: 1.15 }}
                >
                  <span className={styles.charEmoji}>{char.emoji}</span>
                  <span className={styles.charName}>{char.name}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MAIN CONTENT */}
      <div className={styles.content}>
        
        {/* LEFT: Character & Progress */}
        <div className={styles.characterBox}>
          <motion.div 
            className={styles.characterDisplay}
            animate={{
              y: combo > 0 ? -10 : 0,
              scale: combo >= 3 ? 1.1 : 1,
            }}
            transition={{ type: 'spring', stiffness: 100 }}
          >
            <span className={styles.bigEmoji}>{character.emoji}</span>
            {combo >= 3 && <span className={styles.fireEffect}>🔥</span>}
          </motion.div>

          <div className={styles.progressTrack}>
            <div className={styles.progressNodes}>
              {Array.from({ length: maxProgress }).map((_, i) => (
                <motion.div
                  key={i}
                  className={`${styles.node} ${i <= currentProgress ? styles.nodeActive : ''}`}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                />
              ))}
            </div>
          </div>

          {/* POWER-UPS DISPLAY */}
          <div className={styles.powerUpsDisplay}>
            {activePowerUps.length > 0 && (
              <div className={styles.activePowerUps}>
                {activePowerUps.map(pup => {
                  const pu = POWER_UPS.find(p => p.id === pup)
                  return (
                    <motion.div
                      key={pup}
                      className={styles.powerUpBadge}
                      animate={{ rotate: 360 }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      {pu.emoji}
                    </motion.div>
                  )
                })}
              </div>
            )}
          </div>
        </div>

        {/* MIDDLE: Learning Content */}
        <div className={styles.mainContent}>
          {!showQuiz ? (
            <motion.div 
              className={styles.explanationContainer}
              key={`${explanationSetIndex}-${pointIndex}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <h2>{currentSet?.title}</h2>
              <p className={styles.explanationText}>{currentPoint}</p>

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
            </motion.div>
          ) : (
            <motion.div
              className={styles.quizContainer}
              key={`quiz-${quizIndex}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <h2>
                {quizIndex === 2 ? '👑 FINAL BOSS QUIZ' : '📝 Quick Quiz'} {quizIndex + 1}/3
              </h2>
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
                  <strong>📖 Explanation:</strong> {currentQuiz.explanation}
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
            </motion.div>
          )}
        </div>

        {/* RIGHT: Achievements & Info */}
        <div className={styles.rightPanel}>
          {isCompleted ? (
            <motion.div
              className={styles.completionBox}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 100 }}
            >
              <div className={styles.celebrationEmoji}>🎉🏆🎊</div>
              <h2>COURSE MASTERED!</h2>
              <p className={styles.completionStats}>
                <strong>Total XP:</strong> {totalXP} ⭐
              </p>
              <p className={styles.completionStats}>
                <strong>Time:</strong> {Math.floor(elapsedTime / 60)}:{(elapsedTime % 60).toString().padStart(2, '0')}
              </p>
              <p className={styles.completionStats}>
                <strong>Max Streak:</strong> {streak} 🔥
              </p>
              
              {unlockedAchievements.length > 0 && (
                <div className={styles.achievementsList}>
                  <h4>🏅 Achievements Unlocked:</h4>
                  {unlockedAchievements.map(achId => {
                    const ach = ACHIEVEMENTS.find(a => a.id === achId)
                    return (
                      <motion.div
                        key={achId}
                        className={styles.achievementItem}
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                      >
                        {ach.emoji} {ach.name}
                      </motion.div>
                    )
                  })}
                </div>
              )}

              <button
                className={styles.nextBtn}
                onClick={() => navigate('/dashboard')}
              >
                Back to Dashboard
              </button>
            </motion.div>
          ) : (
            <>
              <h3>📊 Progress</h3>
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
                  </li>
                ))}
              </ul>

              <div className={styles.achievementsPreview}>
                <h4>🏅 Potential Achievements:</h4>
                {ACHIEVEMENTS.map(ach => (
                  <div
                    key={ach.id}
                    className={`${styles.achItem} ${
                      unlockedAchievements.includes(ach.id) ? styles.unlocked : ''
                    }`}
                  >
                    {ach.emoji} {ach.name}
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* CONFETTI on completion */}
      {showConfetti && <Confetti />}
    </div>
  )
}

// Simple confetti component
function Confetti() {
  return (
    <div className={styles.confetti}>
      {Array.from({ length: 50 }).map((_, i) => (
        <motion.div
          key={i}
          className={styles.confettiPiece}
          initial={{
            x: Math.random() * window.innerWidth,
            y: -10,
            rotate: 0,
            opacity: 1,
          }}
          animate={{
            x: Math.random() * window.innerWidth,
            y: window.innerHeight + 10,
            rotate: 360,
            opacity: 0,
          }}
          transition={{
            duration: Math.random() * 2 + 2,
            ease: 'linear',
          }}
        >
          {['🎉', '⭐', '🏆', '🎊', '✨'][Math.floor(Math.random() * 5)]}
        </motion.div>
      ))}
    </div>
  )
}
