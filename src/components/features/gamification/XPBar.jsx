import React from 'react'
import { motion } from 'framer-motion'
import { ProgressBar } from '../../common/ProgressBar'
import styles from './XPBar.module.css'

export const XPBar = ({ currentXP = 0, maxXP = 5000, level = 1 }) => {
  const percentage = (currentXP / maxXP) * 100

  return (
    <motion.div
      className={styles.xpBarContainer}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className={styles.xpInfo}>
        <span className={styles.label}>Level {level}</span>
        <span className={styles.xpText}>{currentXP} / {maxXP} XP</span>
      </div>
      <ProgressBar
        progress={percentage}
        variant="xp"
        animated
        showLabel={false}
        height="md"
      />
      <div className={styles.nextLevel}>
        {maxXP - currentXP} XP to Level {level + 1}
      </div>
    </motion.div>
  )
}
