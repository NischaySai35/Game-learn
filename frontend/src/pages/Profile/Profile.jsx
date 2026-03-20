import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
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
  const { user, logoutUser } = useGame()
  const navigate = useNavigate()
  const [selectedAchievement, setSelectedAchievement] = useState(null)

  if (!user) {
    return (
      <div className={styles.profilePage}>
        <p className={styles.loggedOut}>You are not logged in. Please login to view your profile.</p>
      </div>
    )
  }

  const achievements = Array.isArray(user.achievements) ? user.achievements : [];
  const stats = [
    { icon: '🏆', label: 'Achievements', value: achievements.filter(a => a.unlocked).length }
  ];

  const combinedAchievements = achievements.map(a => ({ ...a, unlocked: false }));

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
      <div className={styles.profileActions}>
        <button type="button" onClick={() => navigate('/')}>← Back to Home</button>
        <button type="button" onClick={() => { logoutUser(); navigate('/') }}>Logout</button>
      </div>
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
              {user.avatar ? user.avatar : '🧑'}
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
                {(user.totalXP ?? 0).toLocaleString()} XP
              </Badge>
              <Badge variant="warning" icon="💎">
                {(user.coins ?? 0).toLocaleString()} Coins
              </Badge>
              <Badge variant="streak" icon="🔥">
                {(user.streakDays ?? 0).toLocaleString()} Days
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
            <div className={styles.statIcon}>
              {stat.image ? <img src={stat.image} alt={stat.label} className={styles.statImage} /> : stat.icon}
            </div>
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

      {/* Course Skills and Certificates */}
      <motion.section
        className={styles.certificatesSection}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <h2 className={styles.sectionTitle}>🎓 Certificates</h2>
        {(!user.certificates || user.certificates.length === 0) ? (
          <p>No certificates yet. Complete a course and project to generate one.</p>
        ) : (
          <div className={styles.certificateGrid}>
            {(user.certificates || []).map((cert, idx) => (
              <div key={idx} className={styles.certificateCard}>
                <h3>{cert.course}</h3>
                <p><strong>Project:</strong> {cert.project}</p>
                <p><strong>Date:</strong> {cert.date}</p>
                <p><strong>ID:</strong> {cert.id}</p>
                <a href={cert.shareLink} target="_blank" rel="noreferrer">Share on LinkedIn</a>
              </div>
            ))}
          </div>
        )}
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
          {combinedAchievements.filter(a => a.unlocked).length} / {combinedAchievements.length} Unlocked
        </p>

        <motion.div
          className={styles.achievementsGrid}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {combinedAchievements.map((achievement, idx) => (
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
                image={achievement.image}
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
          {(!user.recentActivity || user.recentActivity.length === 0) ? (
            <p className={styles.emptyState}>No activities yet. Complete your first lesson to unlock the feed.</p>
          ) : (
            user.recentActivity.map((activity, idx) => (
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
            ))
          )}
        </div>
      </motion.section>
    </div>
  )
}
