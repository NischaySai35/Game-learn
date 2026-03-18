import React from 'react'
import { motion } from 'framer-motion'
import styles from './StreakCounter.module.css'

export const StreakCounter = ({ days = 0, maxDays = 30 }) => {
  const percentage = (days / maxDays) * 100

  return (
    <motion.div
      className={styles.streakContainer}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <div className={styles.fireIcon}>
        <motion.span
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          🔥
        </motion.span>
      </div>
      <div className={styles.streakInfo}>
        <div className={styles.streakCount}>
          <motion.span
            className={styles.number}
            key={days}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            {days}
          </motion.span>
          <span className={styles.label}>DAY STREAK</span>
        </div>
        <div className={styles.streakProgress}>
          <div className={styles.progressBar}>
            <motion.div
              className={styles.progressFill}
              initial={{ width: 0 }}
              animate={{ width: `${percentage}%` }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            />
          </div>
          <span className={styles.progressLabel}>{days}/{maxDays}</span>
        </div>
      </div>
    </motion.div>
  )
}
