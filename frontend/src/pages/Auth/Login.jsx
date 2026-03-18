import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useGame } from '../../context/GameContext'
import styles from './Login.module.css'

export default function Login() {
  const { loginUser, isAuthenticated } = useGame()
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    loginUser({ name: name.trim(), email: email.trim() })
    navigate('/onboarding')
  }

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard')
    }
  }, [isAuthenticated, navigate])

  return (
    <div className={styles.loginPage}>
      <motion.section
        className={styles.loginCard}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1>Login / Sign Up</h1>
        <p>Create your account to start your gamified learning journey.</p>

        <form onSubmit={handleSubmit} className={styles.loginForm}>
          <label>
            Full Name
            <input value={name} onChange={e => setName(e.target.value)} required placeholder="Your name" />
          </label>

          <label>
            Email Address
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="you@example.com" />
          </label>

          <button type="submit">Create Account</button>
        </form>
      </motion.section>
    </div>
  )
}
