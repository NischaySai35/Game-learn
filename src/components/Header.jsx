import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import styles from './Header.module.css'

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [featureMenuOpen, setFeatureMenuOpen] = useState(false)
  const location = useLocation()

  const navLinks = [
    { path: '/', label: 'Home', icon: '🏠' },
    { path: '/profile', label: 'Profile', icon: '👤' },
    { path: '/dashboard', label: 'Dashboard', icon: '📊' },
  ]

  const features = [
    { label: 'Daily Challenges', icon: '⚡' },
    { label: 'Mini-Games', icon: '🎮' },
    { label: 'Quizzes', icon: '❓' },
    { label: 'Leaderboards', icon: '🏆' },
    { label: 'Notifications', icon: '🔔' },
    { label: 'Settings', icon: '⚙️' },
  ]

  const isActive = (path) => location.pathname === path

  return (
    <>
      <header className={styles.header}>
        <motion.div
          className={styles.container}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Logo */}
          <Link to="/" className={styles.logo}>
            <span className={styles.logoIcon}>🎮</span>
            <span className={styles.logoText}>GameLearn</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className={styles.nav}>
            {navLinks.map(link => (
              <motion.div key={link.path} whileHover={{ scale: 1.05 }}>
                <Link
                  to={link.path}
                  className={`${styles.navLink} ${isActive(link.path) ? styles.active : ''}`}
                >
                  <span className={styles.icon}>{link.icon}</span>
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* Feature Menu */}
          <div className={styles.featureMenuContainer}>
            <motion.button
              className={styles.featureButton}
              onClick={() => setFeatureMenuOpen(!featureMenuOpen)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>✨</span>
              Features
            </motion.button>

            <AnimatePresence>
              {featureMenuOpen && (
                <motion.div
                  className={styles.featureDropdown}
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  {features.map((feature, idx) => (
                    <motion.button
                      key={feature.label}
                      className={styles.featureItem}
                      whileHover={{ x: 4 }}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                    >
                      <span className={styles.featureIcon}>{feature.icon}</span>
                      {feature.label}
                    </motion.button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className={styles.mobileMenuButton}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            whileTap={{ scale: 0.95 }}
          >
            <span className={styles.hamburger}>☰</span>
          </motion.button>
        </motion.div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className={styles.mobileMenu}
            initial={{ opacity: 0, x: -300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -300 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <nav className={styles.mobileNav}>
              {navLinks.map((link, idx) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <Link
                    to={link.path}
                    className={`${styles.mobileNavLink} ${isActive(link.path) ? styles.active : ''}`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span>{link.icon}</span>
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className={styles.overlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  )
}
