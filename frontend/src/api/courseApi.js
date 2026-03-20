import apiClient from './client'
import { mockCourses, mockDailyChallenges, mockCourseTopics } from './mockData'

const USE_MOCK = import.meta.env.VITE_ENABLE_MOCK_API === 'true'

const delay = (ms = 300) => new Promise(resolve => setTimeout(resolve, ms))

/**
 * ===============================
 * COURSES API
 * ===============================
 */

// Get all courses
export const getCourses = async () => {
  if (USE_MOCK) {
    await delay(300)
    return { data: mockCourses }
  }

  try {
    const response = await apiClient.get('/courses')
    return { data: response.data || [] }
  } catch (error) {
    console.error('Backend failed, using mock courses:', error)
    await delay(300)
    return { data: mockCourses }
  }
}


// Get single course (MongoDB FIX)
export const getCourseById = async (id) => {
  if (USE_MOCK) {
    await delay(300)

    const course = mockCourses.find(
      c => String(c.id) === String(id)
    )

    if (!course) throw new Error('Course not found')

    return { data: course }
  }

  try {
    const response = await apiClient.get(`/courses/${id}`)
    return { data: response.data }
  } catch (error) {
    console.error('Backend failed, using mock course:', error)

    await delay(300)

    const course = mockCourses.find(
      c => String(c.id) === String(id)
    )

    if (!course) throw new Error('Course not found')

    return { data: course }
  }
}


// Personalized courses (MAIN FEATURE)
export const getPersonalizedCourses = async (userId) => {
  if (USE_MOCK) {
    await delay(300)

    return {
      data: {
        recommended: mockCourses.slice(0, 4),
        explore: mockCourses.slice(4)
      }
    }
  }

  try {
    const response = await apiClient.get(`/courses/personalized/${userId}`)

    return {
      data: {
        recommended: response.data.recommended || [],
        explore: response.data.explore || []
      }
    }

  } catch (error) {
    console.error('Error fetching personalized courses:', error)

    await delay(300)

    return {
      data: {
        recommended: [],
        explore: mockCourses
      }
    }
  }
}


// Get topics (MongoDB STRUCTURE FIX)
export const getCourseTopics = async (courseId) => {
  if (USE_MOCK) {
    await delay(300)

    const entry = mockCourseTopics.find(
      c => String(c.courseId) === String(courseId)
    )

    if (!entry) throw new Error('Topics not found')

    return { data: { topics: entry.topics } }
  }

  try {
    const response = await apiClient.get(`/courses/${courseId}/topics`)

    return {
      data: {
        topics: response.data.topics || []
      }
    }

  } catch (error) {
    console.error('Backend failed, using mock topics:', error)

    await delay(300)

    const entry = mockCourseTopics.find(
      c => String(c.courseId) === String(courseId)
    )

    if (!entry) throw new Error('Topics not found')

    return { data: { topics: entry.topics } }
  }
}


// Get topic by ID
export const getTopicById = async (courseId, topicId) => {
  if (USE_MOCK) {
    await delay(250)

    const entry = mockCourseTopics.find(
      c => String(c.courseId) === String(courseId)
    )

    if (!entry) throw new Error('Course topics not found')

    const topic = entry.topics.find(
      (t, index) => String(index) === String(topicId)
    )

    if (!topic) throw new Error('Topic not found')

    return { data: topic }
  }

  try {
    const response = await apiClient.get(`/courses/${courseId}/topics/${topicId}`)
    return { data: response.data }

  } catch (error) {
    console.error('Backend failed, using mock topic:', error)

    await delay(250)

    const entry = mockCourseTopics.find(
      c => String(c.courseId) === String(courseId)
    )

    if (!entry) throw new Error('Course topics not found')

    const topic = entry.topics.find(
      (t, index) => String(index) === String(topicId)
    )

    if (!topic) throw new Error('Topic not found')

    return { data: topic }
  }
}


// Daily challenges
export const getDailyChallenges = async () => {
  if (USE_MOCK) {
    await delay(300)
    return { data: mockDailyChallenges }
  }

  try {
    const response = await apiClient.get('/courses/challenges/daily')
    return { data: response.data }
  } catch (error) {
    console.error('Using mock daily challenges:', error)
    await delay(300)
    return { data: mockDailyChallenges }
  }
}