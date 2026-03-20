import apiClient from './client'



/**
 * ===============================
 * COURSES API
 * ===============================
 */

// Get all courses
export const getCourses = async () => {
  const response = await apiClient.get('/courses')
  return { data: response.data || [] }
}


// Get single course (MongoDB FIX)
export const getCourseById = async (id) => {
  const response = await apiClient.get(`/courses/${id}`)
  return { data: response.data }
}


// Personalized courses (MAIN FEATURE)
export const getPersonalizedCourses = async (userId) => {
  const response = await apiClient.get(`/courses/personalized/${userId}`)

  return {
    data: {
      recommended: response.data.recommended || [],
      explore: response.data.explore || []
    }
  }
}


// Get topics (MongoDB STRUCTURE FIX)
export const getCourseTopics = async (courseId) => {
  const response = await apiClient.get(`/courses/${courseId}/topics`)

  return {
    data: {
      topics: response.data.topics || []
    }
  }
}


// Get topic by ID
export const getTopicById = async (courseId, topicId) => {
  const response = await apiClient.get(`/courses/${courseId}/topics/${topicId}`)
  return { data: response.data }
}


// Daily challenges
export const getDailyChallenges = async () => {
  const response = await apiClient.get('/courses/challenges/daily')
  return { data: response.data }
}