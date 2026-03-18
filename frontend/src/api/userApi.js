import { mockLeaderboard, mockAchievements, mockUserProgress, mockSkills } from './mockData'

// Simulate API delay
const delay = (ms = 300) => new Promise(resolve => setTimeout(resolve, ms))

export const getLeaderboard = async (sortBy = 'totalXP', limit = 15) => {
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

export const searchLeaderboard = async (query) => {
  await delay(300)
  const results = mockLeaderboard.filter(user =>
    user.name.toLowerCase().includes(query.toLowerCase())
  )
  return { data: results }
}

export const getAchievements = async () => {
  await delay(300)
  return { data: mockAchievements }
}

export const getUserProgress = async () => {
  await delay(400)
  return { data: mockUserProgress }
}

export const getSkills = async () => {
  await delay(300)
  return { data: mockSkills }
}

export const getWeeklyStats = async () => {
  await delay(300)
  
  // Mock weekly activity data
  const weeklyStat = [
    { day: 'Mon', xp: 450 },
    { day: 'Tue', xp: 520 },
    { day: 'Wed', xp: 380 },
    { day: 'Thu', xp: 490 },
    { day: 'Fri', xp: 610 },
    { day: 'Sat', xp: 540 },
    { day: 'Sun', xp: 470 },
  ]
  
  return { data: weeklyStat }
}

export const updateUserProfile = async (userData) => {
  await delay(500)
  return { data: { success: true, user: userData } }
}

export const getNotifications = async () => {
  await delay(300)
  const notifications = [
    { id: 1, type: 'achievement', message: 'You unlocked the "Week Warrior" badge!', timestamp: new Date() },
    { id: 2, type: 'course', message: 'You completed "JavaScript Essentials"', timestamp: new Date() },
    { id: 3, type: 'xp', message: 'You earned 100 XP from a quiz', timestamp: new Date() },
  ]
  return { data: notifications }
}
