import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useGame } from '../../context/GameContext'
import { XPBar } from '../../components/features/gamification/XPBar'
import { LevelIndicator } from '../../components/features/gamification/LevelIndicator'
import { StreakCounter } from '../../components/features/gamification/StreakCounter'
import { AchievementBadge } from '../../components/features/gamification/AchievementBadge'
import { Card } from '../../components/common/Card'
import { Badge } from '../../components/common/Badge'
import styles from './Profile.module.css'

export default function Profile() {
  const { user } = useGame()
  const [selectedAchievement, setSelectedAchievement] = useState(null)

  const stats = [
    { icon: '⭐', label: 'Total XP', value: user.totalXP.toLocaleString() },
    { icon: '💎', label: 'Coins', value: user.coins },
    { icon: '🏆', label: 'Achievements', value: user.achievements.filter(a => a.unlocked).length },
    { icon: '📈', label: 'Level', value: user.level },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  return (
    <div className={styles.profilePage}>
      {/* Profile Header */}
      <motion.section
        className={styles.profileHeader}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className={styles.headerContent}>
          <div className={styles.avatarContainer}>
            <motion.div
              className={styles.avatar}
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              {user.avatar}
            </motion.div>
            <motion.div
              className={styles.levelBadge}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <span>Lvl {user.level}</span>
            </motion.div>
          </div>

          <div className={styles.userInfo}>
            <h1 className={styles.userName}>{user.name}</h1>
            <div className={styles.userStats}>
              <Badge variant="primary" icon="⭐">
                {user.totalXP.toLocaleString()} XP
              </Badge>
              <Badge variant="warning" icon="💎">
                {user.coins} Coins
              </Badge>
              <Badge variant="streak" icon="🔥">
                {user.streakDays} Days
              </Badge>
            </div>
          </div>
        </div>

        <LevelIndicator level={user.level} maxLevel={50} />
      </motion.section>

      {/* XP Progress */}
      <motion.section
        className={styles.xpSection}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <XPBar
          currentXP={user.currentXP}
          maxXP={5000}
          level={user.level}
        />
      </motion.section>

      {/* Stats Grid */}
      <motion.section
        className={styles.statsSection}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {stats.map((stat, idx) => (
          <motion.div
            key={idx}
            className={styles.statCard}
            variants={itemVariants}
            whileHover={{ y: -8 }}
          >
            <div className={styles.statIcon}>{stat.icon}</div>
            <div className={styles.statContent}>
              <span className={styles.statLabel}>{stat.label}</span>
              <span className={styles.statValue}>{stat.value}</span>
            </div>
          </motion.div>
        ))}
      </motion.section>

      {/* Streaks Section */}
      <motion.section
        className={styles.streakSection}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <h2>Current Streak</h2>
        <StreakCounter days={user.streakDays} maxDays={30} />
      </motion.section>

      {/* Achievements Section */}
      <motion.section
        className={styles.achievementsSection}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <h2 className={styles.sectionTitle}>🏅 Achievements</h2>
        <p className={styles.sectionSubtitle}>
          {user.achievements.filter(a => a.unlocked).length} / {user.achievements.length} Unlocked
        </p>

        <motion.div
          className={styles.achievementsGrid}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {user.achievements.map((achievement, idx) => (
            <motion.div
              key={achievement.id}
              variants={itemVariants}
              transition={{ delay: idx * 0.05 }}
            >
              <AchievementBadge
                icon={achievement.icon}
                name={achievement.name}
                description={achievement.description}
                unlocked={achievement.unlocked}
                onClick={() => setSelectedAchievement(achievement)}
              />
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* Recent Activity */}
      <motion.section
        className={styles.activitySection}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <h2 className={styles.sectionTitle}>📝 Recent Activity</h2>
        <div className={styles.activityList}>
          {[
            { icon: '🎓', text: 'Completed "React Fundamentals"', time: '2 hours ago' },
            { icon: '🔥', text: 'Reached 7-day streak', time: '1 day ago' },
            { icon: '🏆', text: 'Earned "Course Master" achievement', time: '3 days ago' },
            { icon: '⭐', text: 'Gained 500 XP from quiz', time: '5 days ago' },
            { icon: '💎', text: 'Earned 100 coins', time: '1 week ago' },
          ].map((activity, idx) => (
            <motion.div
              key={idx}
              className={styles.activityItem}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <span className={styles.activityIcon}>{activity.icon}</span>
              <div className={styles.activityContent}>
                <p className={styles.activityText}>{activity.text}</p>
                <span className={styles.activityTime}>{activity.time}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </div>
  )
}
