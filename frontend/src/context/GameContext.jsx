import React, { createContext, useState, useEffect, useContext, useCallback } from 'react'

const GameContext = createContext()

const makeDateKey = (date = new Date()) => date.toISOString().split('T')[0]

const roleCourseMap = {
  Backend: ['Python', 'DBMS', 'OOP', 'APIs', 'System Design'],
  'AI Engineer': ['Python', 'Machine Learning Basics', 'Data Structures', 'Statistics', 'AI Ethics'],
  'Web Developer': ['JavaScript Essentials', 'React Fundamentals', 'Advanced CSS & Design', 'Node.js & Express', 'GraphQL API Development'],
  'Data Engineer': ['DBMS', 'Data Structures', 'Cloud Computing with AWS', 'Big Data Fundamentals', 'System Design'],
}

const defaultUserState = {
  id: null,
  name: 'New Learner',
  email: '',
  avatar: '🧑',
  level: 1,
  currentXP: 0,
  totalXP: 0,
  coins: 0,
  streakDays: 0,
  badge: '',
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
  const [user, setUser] = useState(() => {
    return defaultUserState
  })

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return true
  })

  // Notifications
  const [notifications, setNotifications] = useState([])

  const addNotification = useCallback((message, type = 'info') => {
    const id = Date.now()
    setNotifications(prev => [...prev, { id, message, type }])

    setTimeout(() => {
      setNotifications(prev => prev.filter(notif => notif.id !== id))
    }, 3000)
  }, [])

  const loginUser = useCallback((profile) => {
    const newUser = {
      ...defaultUserState,
      id: Date.now(),
      name: profile.name || 'New Learner',
      email: profile.email || '',
      interestedRoles: profile.interestedRoles || [],
      skills: profile.skills || [],
      badge: profile.badge || 'Starter',
      recommendedCourses: roleCourseMap[profile.interestedRoles?.[0]] || [],
      ...profile,
    }

    setUser(newUser)
    setIsAuthenticated(true)
    addNotification(`Welcome ${newUser.name}!`, 'success')
  }, [addNotification])

  const logoutUser = useCallback(() => {
    setUser(null)
    setIsAuthenticated(false)
    try {
      localStorage.removeItem('gamelearn_user')
      localStorage.removeItem('gamelearn_isAuthenticated')
    } catch (error) {
      console.error('Error clearing localStorage on logout', error)
    }
    addNotification('Logged out successfully.', 'info')
  }, [addNotification])

  // Add XP to user
  const addXP = useCallback((amount) => {
    if (!isAuthenticated || !user) return

    setUser(prevUser => {
      if (!prevUser) return prevUser
      const newXP = prevUser.currentXP + amount
      const levelThreshold = 5000 // XP needed per level
      const newLevel = Math.floor(newXP / levelThreshold) + 1

      return {
        ...prevUser,
        currentXP: newXP % levelThreshold,
        level: newLevel,
        totalXP: prevUser.totalXP + amount,
      }
    })

    addNotification(`+${amount} XP`, 'xp')
  }, [addNotification, isAuthenticated, user])

  // Add coins to user

  const addCoins = useCallback((amount) => {
    if (!isAuthenticated || !user) return

    setUser(prevUser => {
      if (!prevUser) return prevUser
      return {
        ...prevUser,
        coins: prevUser.coins + amount,
      }
    })

    addNotification(`+${amount} Coins`, 'coin')
  }, [addNotification, isAuthenticated, user])

  const setOnboardingProfile = useCallback(({ name, email, interestedRoles, skills, dailyTargetMinutes }) => {
    const recommendedFromRoles = interestedRoles.flatMap(role => roleCourseMap[role] || [])
    const uniqueRec = [...new Set(recommendedFromRoles)].slice(0, 6)

    setUser(prevUser => ({
      ...((prevUser || defaultUserState)),
      name,
      email,
      interestedRoles,
      skills,
      badge: prevUser?.badge || 'Starter',
      dailyTargetMinutes,
      recommendedCourses: uniqueRec,
      dailyLearning: {
        date: makeDateKey(),
        minutes: 0,
        goalMet: false,
        recoveryTarget: 0,
      },
    }))

    if (!isAuthenticated) setIsAuthenticated(true)
    addNotification('Profile setup complete! Welcome to your personalized learning space.', 'success')
  }, [addNotification])

  const recordLearningSession = useCallback((minutes) => {
    setUser(prevUser => {
      const todayKey = makeDateKey()
      const prevDaily = prevUser.dailyLearning
      const prevStreak = prevUser.streakState
      const target = prevUser.dailyTargetMinutes || 60

      let nextDaily = { ...prevDaily }
      let nextStreak = { ...prevStreak }

      // Day rollover logic
      if (prevDaily.date !== todayKey) {
        const prevAchieved = prevDaily.goalMet || prevDaily.minutes >= target
        if (!prevAchieved) {
          const missed = Math.max(0, target - prevDaily.minutes)
          nextStreak = {
            ...nextStreak,
            paused: true,
            missedGoalMinutes: missed,
            recoveryRequiredMinutes: missed + target,
            lastMissedDate: prevDaily.date,
          }
        }

        nextDaily = {
          date: todayKey,
          minutes: minutes,
          goalMet: minutes >= target,
          recoveryTarget: nextStreak.paused ? nextStreak.recoveryRequiredMinutes : 0,
        }
      } else {
        nextDaily = {
          ...nextDaily,
          minutes: nextDaily.minutes + minutes,
          goalMet: nextDaily.goalMet || nextDaily.minutes + minutes >= target,
        }
      }

      // Recovery and streak update
      if (nextStreak.paused) {
        if (nextDaily.minutes >= nextStreak.recoveryRequiredMinutes) {
          nextStreak = {
            ...nextStreak,
            paused: false,
            missedGoalMinutes: 0,
            recoveryRequiredMinutes: 0,
            lastMissedDate: null,
            current: nextStreak.current + 1,
          }
          nextDaily.goalMet = true
          addNotification('Streak recovered! Great job staying on track.', 'success')
        }
      } else if (!prevDaily.goalMet && nextDaily.goalMet) {
        nextStreak = {
          ...nextStreak,
          current: nextStreak.current + 1,
        }
        addNotification('Daily learning goal reached! Streak +1', 'success')
      }

      return {
        ...prevUser,
        streakDays: nextStreak.current,
        streakState: nextStreak,
        dailyLearning: nextDaily,
      }
    })
  }, [addNotification])

  const completeCourse = useCallback((courseName) => {
    setUser(prevUser => {
      const completedCourses = prevUser.completedCourses.includes(courseName)
        ? prevUser.completedCourses
        : [...prevUser.completedCourses, courseName]

      const basicXpAward = 600
      const coinAward = 150

      addXP(basicXpAward)
      addCoins(coinAward)
      addNotification(`Course completed: ${courseName}. +${basicXpAward} XP, +${coinAward} Coins`, 'success')

      return {
        ...prevUser,
        completedCourses,
      }
    })
  }, [addCoins, addNotification, addXP])

  const addCertificate = useCallback((certificate) => {
    setUser(prevUser => ({
      ...prevUser,
      certificates: [...prevUser.certificates, certificate],
    }))
    addNotification('Certificate generated successfully!', 'success')
  }, [addNotification])

  const unlockAchievement = useCallback((achievementId) => {
    let unlockedName = ''
    setUser(prevUser => {
      const updatedAchievements = prevUser.achievements.map(ach => {
        if (ach.id === achievementId) {
          unlockedName = ach.name
          return { ...ach, unlocked: true }
        }
        return ach
      })

      return {
        ...prevUser,
        achievements: updatedAchievements,
      }
    })

    if (unlockedName) {
      addNotification(`Achievement Unlocked: ${unlockedName}!`, 'achievement')
    }
  }, [addNotification])

  const unlockMarketplaceItem = useCallback((item) => {
    setUser(prevUser => {
      if (prevUser.coins < item.cost) {
        addNotification('Not enough coins to unlock this item.', 'error')
        return prevUser
      }
      if (prevUser.unlockedContent.includes(item.id)) {
        addNotification('Item already unlocked.', 'info')
        return prevUser
      }

      const updated = {
        ...prevUser,
        coins: prevUser.coins - item.cost,
        unlockedContent: [...prevUser.unlockedContent, item.id],
      }

      if (!prevUser.achievements.some(ach => ach.id === 7 && ach.unlocked)) {
        setTimeout(() => unlockAchievement(7), 150)
      }

      addNotification(`Unlocked ${item.name}!`, 'success')
      return updated
    })
  }, [addNotification, unlockAchievement])

  const submitProject = useCallback((projectInfo) => {
    const userName = user?.name || 'Learner'
    const newProject = {
      id: Date.now(),
      ...projectInfo,
      status: 'Submitted',
      submittedAt: new Date().toLocaleDateString(),
    }
    setUser(prevUser => ({
      ...prevUser,
      projects: [...prevUser.projects, newProject],
    }))

    const cert = {
      id: `CERT-${Date.now()}`,
      name: userName,
      course: projectInfo.course,
      project: projectInfo.projectName,
      date: new Date().toLocaleDateString(),
      shareLink: `https://www.linkedin.com/shareArticle?mini=true&title=Completed%20${encodeURIComponent(projectInfo.course)}&summary=Just%20finished%20${encodeURIComponent(projectInfo.projectName)}&source=GameLearn`,
    }
    addCertificate(cert)
    addXP(500)
    addCoins(120)
    addNotification('Project submitted. Certificate generated!', 'success')
  }, [addCertificate, addCoins, addNotification, addXP, user])

  const value = {
    user,
    isAuthenticated,
    loginUser,
    logoutUser,
    setUser,
    notifications,
    addNotification,
    addXP,
    addCoins,
    setOnboardingProfile,
    recordLearningSession,
    completeCourse,
    submitProject,
    addCertificate,
    unlockMarketplaceItem,
    unlockAchievement,
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
