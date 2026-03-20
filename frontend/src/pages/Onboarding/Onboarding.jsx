import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useGame } from '../../context/GameContext'
import styles from './Onboarding.module.css'

const roleOptions = [
  'Backend Developer',
  'Frontend Developer',
  'AI Engineer',
  'Software Engineer',
  'Data Scientist',
  'DevOps Engineer',
  'Security Engineer',
  'UI/UX Designer',
  'Web Developer',
  'Cloud Engineer'
]

export default function Onboarding() {
  const { user, setOnboardingProfile } = useGame()
  const navigate = useNavigate()

  const [name, setName] = useState(user?.name || '')
  const [email, setEmail] = useState(user?.email || '')
  const [interestedRoles, setInterestedRoles] = useState(user?.interestedRoles || [])
  const [skills, setSkills] = useState((user?.skills || []).join(', '))
  const [dailyTarget, setDailyTarget] = useState(user?.dailyLearningTarget || 60)
  const [loading, setLoading] = useState(false)

  const toggleRole = (role) => {
    setInterestedRoles(prev =>
      prev.includes(role)
        ? prev.filter(item => item !== role)
        : [...prev, role]
    )
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    // Normalize skills into structured format
    const skillsArray = skills
      .split(',')
      .map(s => s.trim())
      .filter(Boolean)

    const payload = {
      name: name.trim() || 'New Learner',
      email: email.trim() || 'unknown@domain.com',
      interestedRoles,
      skills: skillsArray,
      dailyLearningTarget: Number(dailyTarget)
    }

    const success = await setOnboardingProfile(payload)

    setLoading(false)

    if (success) {
      navigate('/dashboard')
    }
  }

  return (
    <div className={styles.onboardingPage}>
      <motion.section
        className={styles.card}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1>Welcome to GameLearn</h1>
        <p>Tell us a bit so we can personalize your learning path.</p>

        <form className={styles.form} onSubmit={handleSubmit}>
          
          <label>
            Name
            <input
              value={name}
              onChange={e => setName(e.target.value)}
              required
            />
          </label>

          <label>
            Email
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </label>

          <label>Interested Roles</label>
          <div className={styles.roles}>
            {roleOptions.map((role) => (
              <button
                type="button"
                key={role}
                className={`${styles.roleChip} ${
                  interestedRoles.includes(role) ? styles.active : ''
                }`}
                onClick={() => toggleRole(role)}
              >
                {role}
              </button>
            ))}
          </div>

          <label>
            Skills to Learn (comma-separated)
            <input
              value={skills}
              onChange={e => setSkills(e.target.value)}
              placeholder="Node.js, Data Structures, Cloud"
            />
          </label>

          <label>
            Daily Learning Goal
            <select
              value={dailyTarget}
              onChange={e => setDailyTarget(e.target.value)}
            >
              <option value={30}>30 minutes</option>
              <option value={60}>1 hour</option>
              <option value={90}>1.5 hours</option>
              <option value={120}>2 hours</option>
            </select>
          </label>

          <button type="submit" className={styles.submitButton} disabled={loading}>
            {loading ? 'Saving...' : 'Create My Learning Space'}
          </button>

        </form>
      </motion.section>
    </div>
  )
}