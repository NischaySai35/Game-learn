import apiClient from './client'

/**
 * USER & LEADERBOARD API
 */

export const getLeaderboard = async (sortBy = 'totalXP', limit = 15) => {
  const response = await apiClient.get('/leaderboard', { params: { sortBy, limit } })
  return response
}

export const searchLeaderboard = async (query) => {
  const response = await apiClient.get('/leaderboard/search', { params: { q: query } })
  return response
}

export const getAchievements = async () => {
  const response = await apiClient.get('/profile/achievements')
  return response
}

export const getUserProgress = async () => {
  const response = await apiClient.get('/profile/progress')
  return response
}

export const getSkills = async () => {
  const response = await apiClient.get('/profile/skills')
  return response
}

export const getWeeklyStats = async () => {
  const response = await apiClient.get('/profile/weekly-stats')
  return response
}

export const updateUserProfile = async (userData) => {
  const response = await apiClient.put('/profile', userData)
  return response
}

export const getNotifications = async () => {
  const response = await apiClient.get('/profile/notifications')
  return response
}

export const getUserProfile = async () => {
  const response = await apiClient.get('/profile')
  return response
}
