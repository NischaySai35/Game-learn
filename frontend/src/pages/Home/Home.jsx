import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { CourseCard } from '../../components/features/courses/CourseCard'
import { getCourses } from '../../api/courseApi'
import { useGame } from '../../context/GameContext'
import styles from './Home.module.css'

export default function Home() {
  const { user, isAuthenticated } = useGame()
  const navigate = useNavigate()
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const recommendedCourses = user?.recommendedCourses || []
  const recommendedCourseObjects = courses.filter(course =>
  recommendedCourses.includes(course.title)
)

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await getCourses()
        setCourses(response.data)
      } catch (error) {
        console.error('Failed to fetch courses:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchCourses()
  }, [])

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
    <div className={styles.homePage}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <motion.h1
            className={styles.heroTitle}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Master Engineering
            <span className={styles.gradient}> One Challenge at a Time</span>
          </motion.h1>

          <motion.p
            className={styles.heroSubtitle}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Navigate puzzle mazes to unlock bite-sized learning checkpoints, then prove mastery with quizzes, projects and certified achievements.
          </motion.p>

          <motion.button
            className={styles.cta}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            whileHover={{ scale: 1.05, boxShadow: '0 8px 24px rgba(57, 255, 20, 0.4)' }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              if (isAuthenticated) {
                navigate('/dashboard')
              } else {
                navigate('/login')
              }
            }}
          >
            {isAuthenticated ? 'Go to Dashboard' : 'Login to Start'}
          </motion.button>
        </div>

        <motion.div
          className={styles.heroArt}
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          <div className={styles.floatingOrb1} />
          <div className={styles.floatingOrb2} />
          <div className={styles.floatingOrb3} />
        </motion.div>
      </section>

      {/* Your Personalized Path */}
      <section className={styles.recommendedSection}>
        <motion.div
          className={styles.sectionHeader}
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2>🔥 Personalized Learning Space</h2>
          <p>Based on your goals, here's what we suggest</p>
        </motion.div>
        <div className={styles.recommendedBody}>

          {/* Badges (existing behavior preserved) */}
          {recommendedCourses.length > 0 ? (
          recommendedCourses.map((course, index) => (
            <span key={index} className={styles.recBadge}>
              {course}
            </span>
          ))
        ) : (
          <>
            {isAuthenticated && !user?.hasCompletedOnboarding && (
              <p className={styles.emptyRec}>
                Complete onboarding to unlock personalized recommendations.
              </p>
            )}
          </>
        )}

          {/* NEW: Show actual course cards (does NOT break anything) */}
          {recommendedCourseObjects.length > 0 && (
            <div className={styles.coursesGrid}>
              {recommendedCourseObjects.map((course, index) => (
                <CourseCard
                  key={course._id || index}
                  {...course}
                  progress={isAuthenticated ? course.progress : 0}
                  completed={isAuthenticated ? course.completed : 0}
                  isAuthenticated={isAuthenticated}
                  onClick={() => {
                    if (isAuthenticated) {
                      navigate(`/course/${course._id}`)
                    } else {
                      navigate('/login')
                    }
                  }}
                />
              ))}
            </div>
            
          )}

          {isAuthenticated && !user?.hasCompletedOnboarding && (
          <Link className={styles.onboardButton} to="/onboarding">
            Complete Onboarding
          </Link>
        )}

        </div>
      </section>

      {/* Maze Experience Section */}
      <section className={styles.mazeSection}>
        <motion.div className={styles.sectionHeader} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true }}>
          <h2>🧩 Maze-Based Learning</h2>
          <p>Move through the learning maze: discover explanations, solve MCQs, collect coins, and reach the goal.</p>
        </motion.div>

        <div className={styles.mazeSteps}>
          {[
            { icon: '▶️', title: 'Start a topic', desc: 'Pick a learning topic and enter the maze.' },
            { icon: '📘', title: 'Explore checkpoints', desc: 'Read micro-explanations and solve embedded MCQs.' },
            { icon: '🏃', title: 'Collect rewards', desc: 'Earn coins and XP for each correct action.' },
            { icon: '🏁', title: 'Finish & certify', desc: 'Complete project + quiz to generate certificate.' },
          ].map((step, idx) => (
            <motion.div key={idx} className={styles.stepCard} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }} viewport={{ once: true }}>
              <div className={styles.stepIcon}>{step.icon}</div>
              <h3>{step.title}</h3>
              <p>{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Courses Section */}
      <section className={styles.coursesSection}>
        <motion.div
          className={styles.sectionHeader}
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2>🎮 Popular Courses</h2>
          <p>Level up your skills across all engineering disciplines</p>
        </motion.div>

        {loading ? (
          <div className={styles.loading}>
            <div className={styles.spinner} />
          </div>
        ) : (
          <motion.div
            className={styles.coursesGrid}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {courses.map((course, index) => (
              <motion.div key={course._id || index} variants={itemVariants}>
                <CourseCard
                  {...course}
                  progress={isAuthenticated ? course.progress : 0}
                  completed={isAuthenticated ? course.completed : 0}
                  isAuthenticated={isAuthenticated}
                  onClick={() => {
                    if (isAuthenticated) {
                      navigate(`/course/${course._id}`)
                    } else {
                      navigate('/login')
                    }
                  }}
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      </section>

      {/* Features Section */}
      <section className={styles.featuresSection}>
        <motion.div
          className={styles.sectionHeader}
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2>⭐ Why GameLearn?</h2>
          <p>Gamification features that make learning engaging</p>
        </motion.div>

        <motion.div
          className={styles.featuresGrid}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {[
            { icon: '⚡', title: 'XP System', desc: 'Earn experience points for every lesson', path: '/dashboard' },
            { icon: '🎯', title: 'Daily Challenges', desc: 'Complete daily tasks for bonus XP', path: '/dashboard' },
            { icon: '🏆', title: 'Leaderboards', desc: 'Compete with other learners globally', path: '/dashboard' },
            { icon: '🎖️', title: 'Achievements', desc: 'Unlock badges and milestones', path: '/profile' },
            { icon: '🔥', title: 'Streaks', desc: 'Maintain learning streaks for rewards', path: '/dashboard' },
            { icon: '🎮', title: 'Mini-Games', desc: 'Interactive games to reinforce concepts', path: '/quiz' },
          ].map((feature, idx) => (
            <motion.div
              key={idx}
              className={styles.featureCard}
              variants={itemVariants}
              whileHover={{ y: -8, scale: 1.02 }}
              onClick={() => navigate(feature.path)}
            >
              <div className={styles.featureIcon}>{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <motion.div
          className={styles.ctaContent}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2>Ready to Transform Your Learning?</h2>
          <p>Join thousands of engineers mastering their skills</p>
          <motion.button
            className={styles.ctaButton}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              if (isAuthenticated) {
                navigate('/dashboard')
              } else {
                navigate('/login')
              }
            }}
          >
            Explore Courses Now
          </motion.button>
        </motion.div>
      </section>
    </div>
  )
}
