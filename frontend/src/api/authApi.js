import apiClient from './client'

/**
 * Authentication API calls
 */

export const registerUser = async (userName, email, password, interestedRoles, dailyLearningTarget) => {
  try {
    const response = await apiClient.post('/auth/register', {
      name: userName,
      email,
      password,
      interestedRoles,
      dailyLearningTarget,
    })
    return response.data
  } catch (error) {
    throw error.response?.data || error.message
  }
}

export const loginUser = async (email, password) => {
  try {
    const response = await apiClient.post('/auth/login', {
      email,
      password,
    })
    
    // Store token and user info
    if (response.data.token) {
      localStorage.setItem(import.meta.env.VITE_AUTH_TOKEN_KEY || 'auth_token', response.data.token)
      localStorage.setItem(import.meta.env.VITE_AUTH_USER_KEY || 'auth_user', JSON.stringify(response.data.user))
    }
    
    return response.data
  } catch (error) {
    throw error.response?.data || error.message
  }
}

export const logoutUser = () => {
  localStorage.removeItem(import.meta.env.VITE_AUTH_TOKEN_KEY || 'auth_token')
  localStorage.removeItem(import.meta.env.VITE_AUTH_USER_KEY || 'auth_user')
}

export const getCurrentUser = () => {
  const user = localStorage.getItem(import.meta.env.VITE_AUTH_USER_KEY || 'auth_user')
  return user ? JSON.parse(user) : null
}

export const isAuthenticated = () => {
  return !!localStorage.getItem(import.meta.env.VITE_AUTH_TOKEN_KEY || 'auth_token')
}

export const verifyToken = async () => {
  try {
    const response = await apiClient.get('/auth/verify')
    return response.data
  } catch (error) {
    return null
  }
}
