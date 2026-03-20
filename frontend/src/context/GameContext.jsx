import React, { createContext, useState, useEffect, useContext, useCallback } from 'react'

const GameContext = createContext()
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'

const getAuthHeader = () => {
  const token = localStorage.getItem('token')
  return {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  }
}

const makeDateKey = (date = new Date()) => date.toISOString().split('T')[0]

const roleCourseMap = {
  "Frontend Developer": [
    "React Fundamentals",
    "JavaScript Fundamentals",
    "Advanced CSS & Design"
  ],

  "UI/UX Designer": [
    "React Fundamentals",
    "JavaScript Fundamentals",
    "Advanced CSS & Design"
  ],

  "Backend Developer": [
    "JavaScript Fundamentals",
    "Node.js & Express",
    "Database Design",
    "GraphQL API Development"
  ],

  "Web Developer": [
    "JavaScript Fundamentals",
    "Data Structures & Algorithms",
    "Node.js & Express",
    "System Design",
    "GraphQL API Development"
  ],

  "Software Engineer": [
    "Data Structures & Algorithms",
    "DevOps & CI/CD",
    "System Design"
  ],

  "AI Engineer": [
    "Machine Learning Basics",
  ],

  "Data Scientist": [
    "Machine Learning Basics",
    "Data Structures & Algorithms"
  ],

  "Cloud Engineer": [
    "Cloud Computing with AWS"
  ],

  "DevOps Engineer": [
    "DevOps & CI/CD"
  ],

  "Security Engineer": [
    "Web Security"
  ]
}

const defaultUserState = {
  id: null,
  name: 'New Learner',
  email: '',
  password: '',

  avatar: '🧑',
  level: 1,
  currentXP: 0,
  totalXP: 0,
  coins: 0,
  streakDays: 0,

  badge: null, // ✅ initially null

  hasCompletedOnboarding: false, // ✅ important

  recentActivity: [],
  dailyTargetMinutes: 60,
  interestedRoles: [],
  skills: [],
  recommendedCourses: [],
  completedCourses: [],
  projects: [],
  certificates: [],

  dailyLearning: {
    date: makeDateKey(),
    minutes: 0,
    goalMet: false,
    recoveryTarget: 0,
  },

  streakState: {
    current: 0,
    paused: false,
    missedGoalMinutes: 0,
    recoveryRequiredMinutes: 0,
    lastMissedDate: null,
  },

  achievements: [
    { id: 1, name: 'Beginner', image: '/badges/beginner.png', unlocked: false },
    { id: 2, name: 'Skilled', image: '/badges/skilled.png', unlocked: false },
    { id: 3, name: 'Advanced', image: '/badges/advanced.png', unlocked: false },
    { id: 4, name: 'Expert', image: '/badges/expert.png', unlocked: false },
  ],

  unlockedContent: [],
}

export const GameProvider = ({ children }) => {

  const [user, setUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [notifications, setNotifications] = useState([])

  const addNotification = useCallback((message, type = 'info') => {
    const id = Date.now()
    setNotifications(prev => [...prev, { id, message, type }])

    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id))
    }, 3000)
  }, [])

  const logoutUser = useCallback(() => {
    localStorage.removeItem('token') //clear auth token
    setUser(null)
    setIsAuthenticated(false)
    addNotification('Logged out successfully.', 'info')
  }, [addNotification])

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token')
      if (!token) return

      try {
        const res = await fetch(`${API_BASE_URL}/auth/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        const data = await res.json()

        if (res.ok) {
          setUser(data)
          setIsAuthenticated(true)
        } else {
          logoutUser()
        }
      } catch (err) {
        console.error(err)
      }
    }

    fetchUser()
  }, [])


  // ✅ LOGIN / SIGNUP HANDLER (REAL DB VERSION)
  const loginUser = useCallback(async ({ name, email, password, mode }) => {
    try {
      const endpoint =
        mode === 'login'
          ? `${API_BASE_URL}/auth/login`
          : `${API_BASE_URL}/auth/signup`

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      })

      const data = await res.json()

      if (!res.ok) {
        return {
          success: false,
          message: data.message || 'Authentication failed',
        }
      }

      // ✅ Store JWT token
      if (data.token) {
        localStorage.setItem('token', data.token)
      }

      // ✅ Set user from backend (MongoDB / DB)
      setUser(data.user)
      setIsAuthenticated(true)

      addNotification(
        mode === 'login'
          ? `Welcome back ${data.user.name}!`
          : 'Account created successfully!',
        'success'
      )

      return { success: true }

    } catch (err) {
      return {
        success: false,
        message: err.message,
      }
    }
  }, [addNotification])

  // ✅ ONBOARDING (REAL DB VERSION)
  const setOnboardingProfile = useCallback(async ({
    name,
    email,
    interestedRoles,
    skills,
    dailyLearningTarget
  }) => {
    try {
      const token = localStorage.getItem('token')

      // Convert raw skills array to structured skillsProgress format
      const skillsProgress = (skills || []).map(skill => ({
        skill,
        progress: 0
      }))

      // Derive recommended courses from selected roles
      const recommendedFromRoles = interestedRoles.flatMap(
        role => roleCourseMap[role] || []
      )
      const uniqueRec = [...new Set(recommendedFromRoles)].slice(0, 6)

      const res = await fetch(`${API_BASE_URL}/auth/onboarding`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name,
          email,
          interestedRoles,
          skillsProgress,
          dailyLearningTarget,
          recommendedCourses: uniqueRec,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        addNotification(data.message || 'Onboarding failed', 'error')
        return
      }

      // Backend returns the user object directly (not wrapped in { user })
      setUser(data)

      addNotification('Onboarding completed!', 'success')

      return true

    } catch (err) {
      addNotification(err.message, 'error')
    }
  }, [addNotification])

  // ================= GAMIFICATION LOGIC (UNCHANGED) =================

  const addXP = useCallback(async (amount) => {
    if (!isAuthenticated || !user) return

    try {
      const res = await fetch(`${API_BASE_URL}/user/xp`, {
        method: 'POST',
        headers: getAuthHeader(),
        body: JSON.stringify({ amount }),
      })

      const data = await res.json()

      if (res.ok) {
        setUser(data.user)
        addNotification(`+${amount} XP`, 'xp')
      } else {
        console.error(data.message)
      }

    } catch (err) {
      console.error(err)
    }
  }, [addNotification, isAuthenticated, user])

  const addCoins = useCallback(async (amount) => {
    if (!isAuthenticated || !user) return

    try {
      const res = await fetch(`${API_BASE_URL}/user/coins`, {
        method: 'POST',
        headers: getAuthHeader(),
        body: JSON.stringify({ amount }),
      })

      const data = await res.json()

      if (res.ok) {
        setUser(data.user)
        addNotification(`+${amount} Coins`, 'coin')
      } else {
        console.error(data.message)
      }

    } catch (err) {
      console.error(err)
    }
  }, [addNotification, isAuthenticated, user])

  const recordLearningSession = useCallback(async (minutes) => {
    if (!isAuthenticated || !user) return

    try {
      const res = await fetch(`${API_BASE_URL}/learning/time`, {
        method: 'POST',
        headers: getAuthHeader(),
        body: JSON.stringify({ minutes }),
      })

      const data = await res.json()

      if (res.ok) {
        // ✅ backend returns updated user
        setUser(data.user)

        // ✅ notifications based on backend flags
        if (data.streakRecovered) {
          addNotification('Streak recovered!', 'success')
        } else if (data.goalReached) {
          addNotification('Daily goal reached! Streak +1', 'success')
        }

      } else {
        console.error(data.message)
      }

    } catch (err) {
      console.error(err)
    }
  }, [addNotification, isAuthenticated, user])

  const completeCourse = useCallback(async (courseName) => {
    if (!isAuthenticated || !user) return

    try {
      const res = await fetch(`${API_BASE_URL}/user/complete-course`, {
        method: 'POST',
        headers: getAuthHeader(),
        body: JSON.stringify({ courseName }),
      })

      const data = await res.json()

      if (res.ok) {
        // ✅ backend updates:
        // - completedCourses
        // - XP
        // - coins
        setUser(data.user)

        addNotification(`Course completed: ${courseName}`, 'success')
      } else {
        console.error(data.message)
      }

    } catch (err) {
      console.error(err)
    }
  }, [addNotification, isAuthenticated, user])

  const value = {
    user,
    isAuthenticated,
    loginUser,
    logoutUser,
    setUser,
    setOnboardingProfile,
    addXP,
    addCoins,
    recordLearningSession,
    completeCourse,
    notifications,
    addNotification,
  }

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  )
}

export const useGame = () => {
  const context = useContext(GameContext)
  if (!context) {
    throw new Error('useGame must be used within GameProvider')
  }
  return context
}