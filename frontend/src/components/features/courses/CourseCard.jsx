import React from 'react'
import { motion } from 'framer-motion'
import { ProgressBar } from '../../common/ProgressBar'
import { Badge } from '../../common/Badge'
import { Button } from '../../common/Button'
import styles from './CourseCard.module.css'

export const CourseCard = ({
  id,
  title,
  category,
  difficulty,
  progress,
  icon,
  lessons,
  completed,
  onClick,
}) => {
  const difficultyColor = {
    Beginner: '#39FF14',
    Intermediate: '#FFD700',
    Advanced: '#FF6B6B',
  }

  return (
    <motion.div
      className={styles.courseCard}
      whileHover={{ y: -12, scale: 1.03 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className={styles.header}>
        <div className={styles.iconContainer}>
          <span className={styles.icon}>{icon}</span>
        </div>
        <Badge variant={difficulty.toLowerCase()}>{difficulty}</Badge>
      </div>

      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.category}>{category}</p>

        <div className={styles.stats}>
          <span className={styles.stat}>📚 {completed}/{lessons} lessons</span>
          <span className={styles.stat}>🎯 {progress}% complete</span>
        </div>

        <ProgressBar
          progress={progress}
          variant="default"
          animated
          showLabel={false}
          height="sm"
        />
      </div>

      <div className={styles.footer}>
        <motion.button
          className={styles.playButton}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onClick}
        >
          {progress === 100 ? '✅ COMPLETED' : `▶ CONTINUE`}
        </motion.button>
      </div>

      <div className={styles.overlay} />
    </motion.div>
  )
}
