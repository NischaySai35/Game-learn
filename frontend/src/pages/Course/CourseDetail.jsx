import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { getCourseById, getCourseTopics } from '../../api/courseApi'
import { useGame } from '../../context/GameContext'
import ProjectSubmission from '../../components/features/projects/ProjectSubmission'
import courseIcons from '../../assets/courseIcons'
import styles from './CourseDetail.module.css'

export default function CourseDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { completeCourse, recordLearningSession, addXP, addCoins } = useGame()

  const [course, setCourse] = useState(null)
  const [topics, setTopics] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        const [courseResp, topicsResp] = await Promise.all([
          getCourseById(id),
          getCourseTopics(id),
        ])

        setCourse(courseResp.data)
        setTopics(topicsResp.data.topics || [])

      } catch (e) {
        console.error('Error fetching course', e)
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [id])

  if (loading) return <div className={styles.loading}>Loading course...</div>
  if (!course) return <div className={styles.loading}>Course not found.</div>

  const handleCompleteCourse = () => {
    completeCourse(course.title)
    addXP(300)
    addCoins(75)
    recordLearningSession(30)
  }

  const Icon = courseIcons[course.title]

  return (
    <div className={styles.courseDetailPage}>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={styles.header}
      >
        <div className={styles.titleBar}>

          <div className={styles.titleWithIcon}>
            {Icon && <Icon className={styles.courseIcon} />}
            <h1>{course.title}</h1>
          </div>

          <small>{course.category} • {course.difficulty}</small>
        </div>

        <p>{course.description}</p>
      </motion.section>

      <div className={styles.actions}>
        <button onClick={handleCompleteCourse}>Mark Course Complete</button>
        <button onClick={() => navigate('/dashboard')}>Back to Dashboard</button>
      </div>

      <div className={styles.modules}>
        <h2>Modules</h2>

        <ul>
          {topics.length > 0 ? (
            topics.map((topic) => (
              <li key={topic._id}>
                <strong>{topic.title}</strong>

                <button
                  onClick={() =>
                    navigate(`/course/${course._id}/topic/${topic._id}`)
                  }
                >
                  Start Maze
                </button>
              </li>
            ))
          ) : (
            <li>No topic-level maze content configured yet.</li>
          )}
        </ul>
      </div>

      <ProjectSubmission course={course.title} />
    </div>
  )
}