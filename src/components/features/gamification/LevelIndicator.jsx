import React from 'react'
import { motion } from 'framer-motion'
import styles from './LevelIndicator.module.css'

export const LevelIndicator = ({ level = 1, maxLevel = 100 }) => {
  const circumference = 2 * Math.PI * 45 // radius = 45
  const progress = (level / maxLevel) * circumference
  const offset = circumference - progress

  return (
    <motion.div
      className={styles.levelContainer}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <svg className={styles.svg} width="120" height="120" viewBox="0 0 120 120">
        {/* Background circle */}
        <circle
          cx="60"
          cy="60"
          r="45"
          fill="none"
          stroke="#3D3D54"
          strokeWidth="8"
        />
        {/* Progress circle */}
        <motion.circle
          cx="60"
          cy="60"
          r="45"
          fill="none"
          stroke="url(#gradient)"
          strokeWidth="8"
          strokeDasharray={circumference}
          strokeDashoffset={circumference}
          strokeLinecap="round"
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1, type: 'spring' }}
        />
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#39FF14" />
            <stop offset="100%" stopColor="#32dd0b" />
          </linearGradient>
        </defs>
      </svg>
      <div className={styles.levelText}>
        <motion.span
          className={styles.number}
          key={level}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          {level}
        </motion.span>
      </div>
    </motion.div>
  )
}
