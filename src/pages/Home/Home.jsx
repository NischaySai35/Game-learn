import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { CourseCard } from '../../components/features/courses/CourseCard'
import { getCourses } from '../../api/courseApi'
import styles from './Home.module.css'

export default function Home() {
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)

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
            Learn through gamified challenges, earn XP, unlock achievements, and compete on leaderboards
          </motion.p>

          <motion.button
            className={styles.cta}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            whileHover={{ scale: 1.05, boxShadow: '0 8px 24px rgba(57, 255, 20, 0.4)' }}
            whileTap={{ scale: 0.95 }}
          >
            Start Learning Now
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
              <motion.div key={course.id} variants={itemVariants}>
                <CourseCard
                  {...course}
                  onClick={() => console.log('Course clicked:', course.id)}
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
            { icon: '⚡', title: 'XP System', desc: 'Earn experience points for every lesson' },
            { icon: '🎯', title: 'Daily Challenges', desc: 'Complete daily tasks for bonus XP' },
            { icon: '🏆', title: 'Leaderboards', desc: 'Compete with other learners globally' },
            { icon: '🎖️', title: 'Achievements', desc: 'Unlock badges and milestones' },
            { icon: '🔥', title: 'Streaks', desc: 'Maintain learning streaks for rewards' },
            { icon: '🎮', title: 'Mini-Games', desc: 'Interactive games to reinforce concepts' },
          ].map((feature, idx) => (
            <motion.div
              key={idx}
              className={styles.featureCard}
              variants={itemVariants}
              whileHover={{ y: -8, scale: 1.02 }}
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
          >
            Explore Courses Now
          </motion.button>
        </motion.div>
      </section>
    </div>
  )
}
