import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useGame } from '../../context/GameContext'
import styles from './Login.module.css'

export default function Login() {
  const { loginUser, isAuthenticated, user } = useGame()
  const navigate = useNavigate()

  const [mode, setMode] = useState('login') // 'login' | 'signup'

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    const result = await loginUser({
      name: name.trim(),
      email: email.trim(),
      password: password.trim(),
      mode, // important to differentiate login/signup in backend
    })

    // ❌ USER NOT FOUND OR LOGIN FAILED
    if (!result?.success) {
      setError(result?.message || 'User not found. Please create an account.')
      setMode('signup')
      return
    }

    // ✅ SUCCESS
    if (mode === 'signup') {
      navigate('/onboarding')
    } else {
      if (user?.onboardingCompleted) {
        navigate('/dashboard')
      } else {
        navigate('/onboarding')
      }
    }
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
        <h1>{mode === 'login' ? 'Login' : 'Create Account'}</h1>
        <p>
          {mode === 'login'
            ? 'Welcome back! Login to continue your journey.'
            : 'Create your account to start your gamified learning journey.'}
        </p>

        <form onSubmit={handleSubmit} className={styles.loginForm}>
          
          {/* NAME (only for signup) */}
          {mode === 'signup' && (
            <label>
              Full Name
              <input
                value={name}
                onChange={e => setName(e.target.value)}
                required
                placeholder="Your name"
              />
            </label>
          )}

          {/* EMAIL */}
          <label>
            Email Address
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              placeholder="you@example.com"
            />
          </label>

          {/* PASSWORD (both login & signup) */}
          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
            />
          </label>

          <button type="submit">
            {mode === 'login' ? 'Login' : 'Create Account'}
          </button>
        </form>

        {/* ERROR MESSAGE */}
        {error && (
          <p style={{ color: 'red', marginTop: '10px' }}>
            {error}
          </p>
        )}

        {/* Toggle */}
        <p style={{ marginTop: '1rem' }}>
          {mode === 'login' ? (
            <>
              New here?{' '}
              <span
                style={{ color: '#4cafef', cursor: 'pointer' }}
                onClick={() => setMode('signup')}
              >
                Create account
              </span>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <span
                style={{ color: '#4cafef', cursor: 'pointer' }}
                onClick={() => setMode('login')}
              >
                Login
              </span>
            </>
          )}
        </p>
      </motion.section>
    </div>
  )
}