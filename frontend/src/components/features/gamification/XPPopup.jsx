import React from 'react'
import { motion } from 'framer-motion'
import styles from './XPPopup.module.css'

export const XPPopup = ({ xp, x = 0, y = 0, onComplete }) => {
  return (
    <motion.div
      className={styles.xpPopup}
      style={{ left: x, top: y }}
      initial={{ opacity: 1, scale: 1, y: 0 }}
      animate={{ opacity: 0, scale: 1.2, y: -60 }}
      transition={{ duration: 1.5, ease: 'easeOut' }}
      onAnimationComplete={onComplete}
    >
      <motion.div
        className={styles.content}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 15 }}
      >
        <span className={styles.xpText}>+{xp}</span>
        <span className={styles.label}>XP</span>
      </motion.div>
    </motion.div>
  )
}
