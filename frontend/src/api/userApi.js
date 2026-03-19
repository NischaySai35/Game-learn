import apiClient from './client'
import { mockLeaderboard, mockAchievements, mockUserProgress, mockSkills } from './mockData'

// Use real API if backend is available, fallback to mock
const USE_MOCK = import.meta.env.VITE_ENABLE_MOCK_API === 'true'

// Simulate API delay for testing
const delay = (ms = 300) => new Promise(resolve => setTimeout(resolve, ms))

/**
 * USER & LEADERBOARD API
 */

export const getLeaderboard = async (sortBy = 'totalXP', limit = 15) => {
  if (USE_MOCK) {
    await delay(400)
    let sorted = [...mockLeaderboard]
    
    switch (sortBy) {
      case 'level':
        sorted.sort((a, b) => b.level - a.level)
        break
      case 'streak':
        sorted.sort((a, b) => b.streak - a.streak)
        break
      case 'totalXP':
      default:
        sorted.sort((a, b) => b.totalXP - a.totalXP)
        break
    }
    
    return { data: sorted.slice(0, limit) }
  }
  
  try {
    const response = await apiClient.get('/leaderboard', { params: { sortBy, limit } })
    return response
  } catch (error) {
    console.error('Error fetching leaderboard:', error)
    // Fallback to mock
    await delay(400)
    let sorted = [...mockLeaderboard]
    
    switch (sortBy) {
      case 'level':
        sorted.sort((a, b) => b.level - a.level)
        break
      case 'streak':
        sorted.sort((a, b) => b.streak - a.streak)
        break
      case 'totalXP':
      default:
        sorted.sort((a, b) => b.totalXP - a.totalXP)
        break
    }
    
    return { data: sorted.slice(0, limit) }
  }
}

export const searchLeaderboard = async (query) => {
  if (USE_MOCK) {
    await delay(300)
    const results = mockLeaderboard.filter(user =>
      user.name.toLowerCase().includes(query.toLowerCase())
    )
    return { data: results }
  }
  
  try {
    const response = await apiClient.get('/leaderboard/search', { params: { q: query } })
    return response
  } catch (error) {
    console.error('Error searching leaderboard:', error)
    // Fallback to mock
    await delay(300)
    const results = mockLeaderboard.filter(user =>
      user.name.toLowerCase().includes(query.toLowerCase())
    )
    return { data: results }
  }
}

export const getAchievements = async () => {
  if (USE_MOCK) {
    await delay(300)
    return { data: mockAchievements }
  }
  
  try {
    const response = await apiClient.get('/profile/achievements')
    return response
  } catch (error) {
    console.error('Error fetching achievements:', error)
    // Fallback to mock
    await delay(300)
    return { data: mockAchievements }
  }
}

export const getUserProgress = async () => {
  if (USE_MOCK) {
    await delay(400)
    return { data: mockUserProgress }
  }
  
  try {
    const response = await apiClient.get('/profile/progress')
    return response
  } catch (error) {
    console.error('Error fetching user progress:', error)
    // Fallback to mock
    await delay(400)
    return { data: mockUserProgress }
  }
}

export const getSkills = async () => {
  if (USE_MOCK) {
    await delay(300)
    return { data: mockSkills }
  }
  
  try {
    const response = await apiClient.get('/profile/skills')
    return response
  } catch (error) {
    console.error('Error fetching skills:', error)
    // Fallback to mock
    await delay(300)
    return { data: mockSkills }
  }
}

export const getWeeklyStats = async () => {
  if (USE_MOCK) {
    await delay(300)
    return {
      data: [
        { day: 'Mon', xp: 120 },
        { day: 'Tue', xp: 85 },
        { day: 'Wed', xp: 200 },
        { day: 'Thu', xp: 150 },
        { day: 'Fri', xp: 180 },
        { day: 'Sat', xp: 220 },
        { day: 'Sun', xp: 90 },
      ],
    }
  }
  
  try {
    const response = await apiClient.get('/profile/weekly-stats')
    return response
  } catch (error) {
    console.error('Error fetching weekly stats:', error)
    // Fallback to mock
    await delay(300)
    return {
      data: [
        { day: 'Mon', xp: 120 },
        { day: 'Tue', xp: 85 },
        { day: 'Wed', xp: 200 },
        { day: 'Thu', xp: 150 },
        { day: 'Fri', xp: 180 },
        { day: 'Sat', xp: 220 },
        { day: 'Sun', xp: 90 },
      ],
    }
  }
}

export const updateUserProfile = async (userData) => {
  if (USE_MOCK) {
    await delay(500)
    return { data: { success: true, user: userData } }
  }
  
  try {
    const response = await apiClient.put('/profile', userData)
    return response
  } catch (error) {
    console.error('Error updating user profile:', error)
    // Fallback to mock
    await delay(500)
    return { data: { success: true, user: userData } }
  }
}

export const getNotifications = async () => {
  if (USE_MOCK) {
    await delay(200)
    return { data: [] }
  }
  
  try {
    const response = await apiClient.get('/profile/notifications')
    return response
  } catch (error) {
    console.error('Error fetching notifications:', error)
    // Fallback to mock
    await delay(200)
    return { data: [] }
  }
}

export const getUserProfile = async () => {
  if (USE_MOCK) {
    await delay(300)
    return { data: mockUserProgress }
  }
  
  try {
    const response = await apiClient.get('/profile')
    return response
  } catch (error) {
    console.error('Error fetching user profile:', error)
    // Fallback to mock
    await delay(300)
    return { data: mockUserProgress }
  }
}
