import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useGame } from '../../context/GameContext'
import styles from './Login.module.css'

export default function Login() {
  const { loginUser, loginAsGuest, isAuthenticated, user } = useGame()
  const navigate = useNavigate()

  const [mode, setMode] = useState('login') // 'login' | 'signup'

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const result = await loginUser({
      name: name.trim(),
      email: email.trim(),
      password: password.trim(),
      mode,
    })

    setLoading(false)

    // ❌ USER NOT FOUND OR LOGIN FAILED
    if (!result?.success) {
      setError(result?.message || 'User not found. Please create an account.')
      if (mode === 'login') {
        setMode('signup')
      }
      return
    }

    // ✅ SUCCESS
    if (mode === 'signup') {
      navigate('/onboarding')
    } else {
      if (user?.onboardingCompleted || user?.hasCompletedOnboarding) {
        navigate('/dashboard')
      } else {
        navigate('/onboarding')
      }
    }
  }

  const handleGuestLogin = async () => {
    setError('')
    setLoading(true)

    const result = await loginAsGuest()

    setLoading(false)

    if (!result?.success) {
      setError(result?.message || 'Guest login failed')
      return
    }

    // Guest users skip onboarding and go straight to dashboard
    navigate('/dashboard')
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
                disabled={loading}
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
              disabled={loading}
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
              disabled={loading}
            />
          </label>

          <button type="submit" disabled={loading}>
            {loading ? 'Loading...' : (mode === 'login' ? 'Login' : 'Create Account')}
          </button>
        </form>

        {/* ERROR MESSAGE */}
        {error && (
          <p style={{ color: '#ff6b6b', marginTop: '10px', textAlign: 'center' }}>
            {error}
          </p>
        )}

        {/* DIVIDER */}
        <div className={styles.divider}>
          <span>or</span>
        </div>

        {/* GUEST LOGIN */}
        <button 
          className={styles.guestBtn}
          onClick={handleGuestLogin}
          disabled={loading}
          type="button"
        >
          {loading ? '⏳ Loading...' : '👤 Join as Guest'}
        </button>

        {/* Toggle */}
        <p style={{ marginTop: '1rem', textAlign: 'center' }}>
          {mode === 'login' ? (
            <>
              New here?{' '}
              <span
                style={{ color: '#4cafef', cursor: 'pointer', fontWeight: 'bold' }}
                onClick={() => { setMode('signup'); setError(''); }}
              >
                Create account
              </span>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <span
                style={{ color: '#4cafef', cursor: 'pointer', fontWeight: 'bold' }}
                onClick={() => { setMode('login'); setError(''); }}
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