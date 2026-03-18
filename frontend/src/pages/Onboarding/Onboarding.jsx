import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useGame } from '../../context/GameContext'
import styles from './Onboarding.module.css'

const roleOptions = ['Backend', 'AI Engineer', 'Web Developer', 'Data Engineer', 'DevOps']

export default function Onboarding() {
  const { user, setOnboardingProfile } = useGame()
  const navigate = useNavigate()

  const [name, setName] = useState(user.name || '')
  const [email, setEmail] = useState(user.email || '')
  const [interestedRoles, setInterestedRoles] = useState(user.interestedRoles || [])
  const [skills, setSkills] = useState((user.skills || []).join(', '))
  const [dailyTarget, setDailyTarget] = useState(user.dailyTargetMinutes || 60)

  const toggleRole = (role) => {
    setInterestedRoles(prev =>
      prev.includes(role) ? prev.filter(item => item !== role) : [...prev, role]
    )
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setOnboardingProfile({
      name: name.trim() || 'New Learner',
      email: email.trim() || 'unknown@domain.com',
      interestedRoles,
      skills: skills.split(',').map(s => s.trim()).filter(Boolean),
      dailyTargetMinutes: Number(dailyTarget),
    })
    navigate('/dashboard')
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
            <input value={name} onChange={e => setName(e.target.value)} required />
          </label>

          <label>
            Email
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
          </label>

          <div className={styles.roles}>{roleOptions.map((role) => (
            <button
              type="button"
              key={role}
              className={`${styles.roleChip} ${interestedRoles.includes(role) ? styles.active : ''}`}
              onClick={() => toggleRole(role)}
            >
              {role}
            </button>
          ))}</div>

          <label>
            Skills to Learn (comma-separated)
            <input
              value={skills}
              onChange={e => setSkills(e.target.value)}
              placeholder="Python, OOP, APIs"
            />
          </label>

          <label>
            Daily Learning Goal
            <select value={dailyTarget} onChange={e => setDailyTarget(e.target.value)}>
              <option value={30}>30 minutes</option>
              <option value={60}>1 hour</option>
            </select>
          </label>

          <button type="submit" className={styles.submitButton}>Create My Learning Space</button>
        </form>
      </motion.section>
    </div>
  )
}
