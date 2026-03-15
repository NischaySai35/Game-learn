import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { getUserProgress, getLeaderboard, getSkills } from '../../api/userApi'
import { ProgressBar } from '../../components/common/ProgressBar'
import { Badge } from '../../components/common/Badge'
import styles from './Dashboard.module.css'

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('progress')
  const [progress, setProgress] = useState([])
  const [skills, setSkills] = useState([])
  const [leaderboard, setLeaderboard] = useState([])
  const [sortBy, setSortBy] = useState('totalXP')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const [progRes, skillRes, leaderRes] = await Promise.all([
          getUserProgress(),
          getSkills(),
          getLeaderboard(sortBy),
        ])
        setProgress(progRes.data)
        setSkills(skillRes.data)
        setLeaderboard(leaderRes.data)
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [sortBy])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  }

  const tabs = [
    { id: 'progress', label: 'My Progress', icon: '📈' },
    { id: 'leaderboard', label: 'Leaderboard', icon: '🏆' },
  ]

  return (
    <div className={styles.dashboardPage}>
      {/* Tabs */}
      <motion.div
        className={styles.tabsContainer}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {tabs.map(tab => (
          <motion.button
            key={tab.id}
            className={`${styles.tab} ${activeTab === tab.id ? styles.active : ''}`}
            onClick={() => setActiveTab(tab.id)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>{tab.icon}</span>
            {tab.label}
          </motion.button>
        ))}
      </motion.div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        {activeTab === 'progress' && (
          <motion.div
            key="progress"
            className={styles.tabContent}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {/* Learning Path */}
            <section className={styles.section}>
              <h2>📚 Learning Path</h2>
              <motion.div
                className={styles.progressList}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {loading ? (
                  <div className={styles.loading}>
                    <div className={styles.spinner} />
                  </div>
                ) : (
                  progress.map((item, idx) => (
                    <motion.div
                      key={item.id}
                      className={styles.progressItem}
                      variants={itemVariants}
                      whileHover={{ x: 8 }}
                    >
                      <div className={styles.courseInfo}>
                        <h3>{item.course}</h3>
                        <p className={styles.status}>{item.status}</p>
                      </div>
                      <div className={styles.progressBar}>
                        <ProgressBar
                          progress={item.progress}
                          variant={item.progress === 100 ? 'success' : 'default'}
                          animated
                          showLabel={true}
                          height="md"
                        />
                      </div>
                      <Badge variant={item.progress === 100 ? 'success' : 'primary'}>
                        {item.progress}%
                      </Badge>
                    </motion.div>
                  ))
                )}
              </motion.div>
            </section>

            {/* Skills Breakdown */}
            <section className={styles.section}>
              <h2>🎯 Skills Overview</h2>
              <motion.div
                className={styles.skillsList}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {loading ? (
                  <div className={styles.loading}>
                    <div className={styles.spinner} />
                  </div>
                ) : (
                  skills.map((skill, idx) => (
                    <motion.div
                      key={idx}
                      className={styles.skillItem}
                      variants={itemVariants}
                    >
                      <div className={styles.skillName}>{skill.name}</div>
                      <ProgressBar
                        progress={skill.level}
                        variant="leaderboard"
                        animated
                        showLabel={true}
                        height="md"
                      />
                    </motion.div>
                  ))
                )}
              </motion.div>
            </section>

            {/* Weekly Stats */}
            <section className={styles.section}>
              <h2>📊 Weekly Activity</h2>
              <motion.div
                className={styles.weeklyChart}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {[
                  { day: 'Mon', xp: 450 },
                  { day: 'Tue', xp: 520 },
                  { day: 'Wed', xp: 380 },
                  { day: 'Thu', xp: 490 },
                  { day: 'Fri', xp: 610 },
                  { day: 'Sat', xp: 540 },
                  { day: 'Sun', xp: 470 },
                ].map((stat, idx) => (
                  <motion.div
                    key={stat.day}
                    className={styles.chartBar}
                    initial={{ height: 0 }}
                    animate={{ height: `${(stat.xp / 610) * 200}px` }}
                    transition={{ delay: idx * 0.05, duration: 0.6 }}
                  >
                    <div className={styles.barLabel}>{stat.day}</div>
                    <div className={styles.barValue}>{stat.xp}</div>
                  </motion.div>
                ))}
              </motion.div>
            </section>
          </motion.div>
        )}

        {activeTab === 'leaderboard' && (
          <motion.div
            key="leaderboard"
            className={styles.tabContent}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {/* Sort Options */}
            <motion.div
              className={styles.sortContainer}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {['totalXP', 'level', 'streak'].map(option => (
                <motion.button
                  key={option}
                  className={`${styles.sortButton} ${sortBy === option ? styles.active : ''}`}
                  onClick={() => setSortBy(option)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {option === 'totalXP' && '⭐ XP'}
                  {option === 'level' && '🎖️ Level'}
                  {option === 'streak' && '🔥 Streak'}
                </motion.button>
              ))}
            </motion.div>

            {/* Leaderboard Table */}
            <motion.div
              className={styles.leaderboardContainer}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {loading ? (
                <div className={styles.loading}>
                  <div className={styles.spinner} />
                </div>
              ) : (
                leaderboard.map((user, idx) => (
                  <motion.div
                    key={user.id}
                    className={`${styles.leaderboardRow} ${user.rank <= 3 ? styles[`rank${user.rank}`] : ''}`}
                    variants={itemVariants}
                    whileHover={{ x: 12 }}
                  >
                    <div className={styles.ranking}>
                      {user.rank === 1 && '🥇'}
                      {user.rank === 2 && '🥈'}
                      {user.rank === 3 && '🥉'}
                      {user.rank > 3 && <span className={styles.rankNum}>#{user.rank}</span>}
                    </div>

                    <div className={styles.userCell}>
                      <span className={styles.userAvatar}>{user.avatar}</span>
                      <div className={styles.userName}>{user.name}</div>
                    </div>

                    <div className={styles.statCell}>
                      <span className={styles.level}>Lv {user.level}</span>
                    </div>

                    <div className={styles.statCell}>
                      <span className={styles.xp}>{user.totalXP.toLocaleString()}</span>
                    </div>

                    <div className={styles.statCell}>
                      <motion.span
                        className={styles.streak}
                        animate={user.streak > 0 ? { scale: [1, 1.1, 1] } : {}}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        🔥 {user.streak}
                      </motion.span>
                    </div>
                  </motion.div>
                ))
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
