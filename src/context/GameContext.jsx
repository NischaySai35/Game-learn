import React, { createContext, useState, useContext, useCallback } from 'react'

const GameContext = createContext()

export const GameProvider = ({ children }) => {
  // User data
  const [user, setUser] = useState({
    id: 1,
    name: 'Alex Developer',
    avatar: '👨‍💻',
    level: 12,
    currentXP: 2850,
    totalXP: 5000,
    coins: 1240,
    streakDays: 7,
    achievements: [
      { id: 1, name: 'First Steps', icon: '🎯', unlocked: true },
      { id: 2, name: 'Week Warrior', icon: '🔥', unlocked: true },
      { id: 3, name: 'Course Master', icon: '👑', unlocked: true },
      { id: 4, name: 'Quiz Champion', icon: '🏆', unlocked: true },
      { id: 5, name: 'Night Owl', icon: '🦉', unlocked: false },
      { id: 6, name: 'Social Butterfly', icon: '🦋', unlocked: false },
    ],
  })

  // Notifications
  const [notifications, setNotifications] = useState([])

  // Add XP to user
  const addXP = useCallback((amount) => {
    setUser(prevUser => {
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

    // Add notification
    addNotification(`+${amount} XP`, 'xp')
  }, [])

  // Add coins to user
  const addCoins = useCallback((amount) => {
    setUser(prevUser => ({
      ...prevUser,
      coins: prevUser.coins + amount,
    }))

    addNotification(`+${amount} Coins`, 'coin')
  }, [])

  // Unlock achievement
  const unlockAchievement = useCallback((achievementId) => {
    setUser(prevUser => ({
      ...prevUser,
      achievements: prevUser.achievements.map(ach =>
        ach.id === achievementId ? { ...ach, unlocked: true } : ach
      ),
    }))

    const achievement = user.achievements.find(a => a.id === achievementId)
    if (achievement) {
      addNotification(`Achievement Unlocked: ${achievement.name}!`, 'achievement')
    }
  }, [user.achievements])

  // Update streak
  const updateStreak = useCallback((days) => {
    setUser(prevUser => ({
      ...prevUser,
      streakDays: days,
    }))
  }, [])

  // Add notification
  const addNotification = useCallback((message, type = 'info') => {
    const id = Date.now()
    setNotifications(prev => [...prev, { id, message, type }])

    // Auto remove after 3 seconds
    setTimeout(() => {
      setNotifications(prev => prev.filter(notif => notif.id !== id))
    }, 3000)
  }, [])

  const value = {
    user,
    setUser,
    notifications,
    addNotification,
    addXP,
    addCoins,
    unlockAchievement,
    updateStreak,
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
