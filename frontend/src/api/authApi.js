import apiClient from './client'

const TOKEN_KEY = import.meta.env.VITE_AUTH_TOKEN_KEY || 'auth_token'
const USER_KEY = import.meta.env.VITE_AUTH_USER_KEY || 'auth_user'

/**
 * REGISTER
 */
export const registerUser = async (userName, email, password, interestedRoles, dailyLearningTarget) => {
  try {
    const response = await apiClient.post('/auth/signup', {
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

/**
 * LOGIN
 */
export const loginUser = async (email, password) => {
  try {
    const response = await apiClient.post('/auth/login', {
      email,
      password,
    })

    const { token, user } = response.data

    if (token && user) {
      localStorage.setItem(TOKEN_KEY, token)
      localStorage.setItem(USER_KEY, JSON.stringify(user))
    }

    return response.data
  } catch (error) {
    throw error.response?.data || error.message
  }
}

/**
 * UPDATE USER (after onboarding / profile changes)
 */
export const updateUser = async (data) => {
  try {
    const token = localStorage.getItem(TOKEN_KEY)

    const response = await apiClient.put('/auth/update-profile', data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    const updatedUser = response.data

    // ✅ update localStorage with latest user
    localStorage.setItem(USER_KEY, JSON.stringify(updatedUser))

    return updatedUser
  } catch (error) {
    throw error.response?.data || error.message
  }
}

/**
 * COMPLETE ONBOARDING
 */
export const completeOnboarding = async (onboardingData) => {
  try {
    const token = localStorage.getItem(TOKEN_KEY)

    const response = await apiClient.post('/auth/onboarding', onboardingData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    const updatedUser = response.data

    // ✅ update local storage immediately
    localStorage.setItem(USER_KEY, JSON.stringify(updatedUser))

    return updatedUser
  } catch (error) {
    throw error.response?.data || error.message
  }
}

/**
 * LOGOUT
 */
export const logoutUser = () => {
  localStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem(USER_KEY)
}

/**
 * GET CURRENT USER (from localStorage)
 */
export const getCurrentUser = () => {
  const user = localStorage.getItem(USER_KEY)
  return user ? JSON.parse(user) : null
}

/**
 * AUTH CHECK
 */
export const isAuthenticated = () => {
  return !!localStorage.getItem(TOKEN_KEY)
}

/**
 * VERIFY TOKEN (backend)
 */
export const verifyToken = async () => {
  try {
    const token = localStorage.getItem(TOKEN_KEY)

    const response = await apiClient.get('/auth/verify', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    return response.data
  } catch (error) {
    return null
  }
}

/**
 * REFRESH USER FROM BACKEND (IMPORTANT)
 * Use this after onboarding or page reload
 */
export const refreshUser = async () => {
  try {
    const token = localStorage.getItem(TOKEN_KEY)

    const response = await apiClient.get('/auth/me', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    const user = response.data

    localStorage.setItem(USER_KEY, JSON.stringify(user))

    return user
  } catch (error) {
    return null
  }
}