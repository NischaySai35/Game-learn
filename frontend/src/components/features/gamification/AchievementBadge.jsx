import React from 'react'
import { motion } from 'framer-motion'
import styles from './AchievementBadge.module.css'

export const AchievementBadge = ({
  icon,
  name,
  description,
  unlocked = false,
  onClick,
  image,
}) => {
  return (
    <motion.div
      className={`${styles.badgeContainer} ${unlocked ? styles.unlocked : styles.locked}`}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', stiffness: 300 }}
      onClick={onClick}
    >
      <div className={styles.badgeIcon}>
        {image ? (
          <img src={image} alt={name} className={styles.badgeImage} />
        ) : (
          <span className={styles.icon}>{icon}</span>
        )}
        {unlocked && <div className={styles.unlockGlow} />}
      </div>
      <div className={styles.badgeInfo}>
        <h4 className={styles.name}>{name}</h4>
        <p className={styles.description}>{description}</p>
      </div>
    </motion.div>
  )
}
