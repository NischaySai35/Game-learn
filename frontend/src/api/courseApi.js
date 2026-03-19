import apiClient from './client'
import { mockCourses, mockDailyChallenges, mockCourseTopics } from './mockData'

// Use real API if backend is available, fallback to mock
const USE_MOCK = import.meta.env.VITE_ENABLE_MOCK_API === 'true'

// Simulate API delay for testing
const delay = (ms = 300) => new Promise(resolve => setTimeout(resolve, ms))

/**
 * COURSES API
 */

export const getCourses = async () => {
  if (USE_MOCK) {
    await delay(400)
    return { data: mockCourses }
  }
  
  try {
    const response = await apiClient.get('/courses')
    return response
  } catch (error) {
    console.error('Error fetching courses:', error)
    // Fallback to mock data
    await delay(400)
    return { data: mockCourses }
  }
}

export const getCourseById = async (id) => {
  if (USE_MOCK) {
    await delay(300)
    const course = mockCourses.find(c => c.id === parseInt(id))
    if (!course) throw new Error('Course not found')
    return { data: course }
  }
  
  try {
    const response = await apiClient.get(`/courses/${id}`)
    return response
  } catch (error) {
    console.error('Error fetching course:', error)
    // Fallback to mock
    await delay(300)
    const course = mockCourses.find(c => c.id === parseInt(id))
    if (!course) throw new Error('Course not found')
    return { data: course }
  }
}

export const searchCourses = async (query) => {
  if (USE_MOCK) {
    await delay(300)
    const results = mockCourses.filter(
      c => c.title.toLowerCase().includes(query.toLowerCase()) ||
           c.category.toLowerCase().includes(query.toLowerCase())
    )
    return { data: results }
  }
  
  try {
    const response = await apiClient.get('/courses/search', { params: { q: query } })
    return response
  } catch (error) {
    console.error('Error searching courses:', error)
    // Fallback to mock
    await delay(300)
    const results = mockCourses.filter(
      c => c.title.toLowerCase().includes(query.toLowerCase()) ||
           c.category.toLowerCase().includes(query.toLowerCase())
    )
    return { data: results }
  }
}

export const getCoursesByCategory = async (category) => {
  if (USE_MOCK) {
    await delay(300)
    const courses = mockCourses.filter(c => c.category === category)
    return { data: courses }
  }
  
  try {
    const response = await apiClient.get('/courses', { params: { category } })
    return response
  } catch (error) {
    console.error('Error fetching courses by category:', error)
    // Fallback to mock
    await delay(300)
    const courses = mockCourses.filter(c => c.category === category)
    return { data: courses }
  }
}

export const getCoursesProgress = async () => {
  if (USE_MOCK) {
    await delay(400)
    const courseProgress = mockCourses.map(course => ({
      id: course.id,
      title: course.title,
      progress: course.progress,
      category: course.category,
    }))
    return { data: courseProgress }
  }
  
  try {
    const response = await apiClient.get('/progress')
    return response
  } catch (error) {
    console.error('Error fetching course progress:', error)
    // Fallback to mock
    await delay(400)
    const courseProgress = mockCourses.map(course => ({
      id: course.id,
      title: course.title,
      progress: course.progress,
      category: course.category,
    }))
    return { data: courseProgress }
  }
}

export const getCourseTopics = async (courseId) => {
  if (USE_MOCK) {
    await delay(300)
    const courseTopic = mockCourseTopics.find(entry => entry.courseId === Number(courseId))
    if (!courseTopic) throw new Error('Course topics not found')
    return { data: courseTopic }
  }
  
  try {
    const response = await apiClient.get(`/courses/${courseId}/topics`)
    return response
  } catch (error) {
    console.error('Error fetching course topics:', error)
    // Fallback to mock
    await delay(300)
    const courseTopic = mockCourseTopics.find(entry => entry.courseId === Number(courseId))
    if (!courseTopic) throw new Error('Course topics not found')
    return { data: courseTopic }
  }
}

export const getTopicById = async (courseId, topicId) => {
  if (USE_MOCK) {
    await delay(250)
    const courseTopic = mockCourseTopics.find(entry => entry.courseId === Number(courseId))
    if (!courseTopic) throw new Error('Course topics not found')
    const topic = courseTopic.topics.find(t => t.id === topicId)
    if (!topic) throw new Error('Topic not found')
    return { data: topic }
  }
  
  try {
    const response = await apiClient.get(`/courses/${courseId}/topics/${topicId}`)
    return response
  } catch (error) {
    console.error('Error fetching topic:', error)
    // Fallback to mock
    await delay(250)
    const courseTopic = mockCourseTopics.find(entry => entry.courseId === Number(courseId))
    if (!courseTopic) throw new Error('Course topics not found')
    const topic = courseTopic.topics.find(t => t.id === topicId)
    if (!topic) throw new Error('Topic not found')
    return { data: topic }
  }
}

export const getDailyChallenges = async () => {
  if (USE_MOCK) {
    await delay(300)
    return { data: mockDailyChallenges }
  }
  
  try {
    const response = await apiClient.get('/courses/challenges/daily')
    return response
  } catch (error) {
    console.error('Error fetching daily challenges:', error)
    // Fallback to mock
    await delay(300)
    return { data: mockDailyChallenges }
  }
}

export const completeCourse = async (courseId) => {
  if (USE_MOCK) {
    await delay(500)
    return { data: { success: true, xpGained: 500, coinsGained: 100 } }
  }
  
  try {
    const response = await apiClient.post(`/courses/${courseId}/complete`)
    return response
  } catch (error) {
    console.error('Error completing course:', error)
    // Fallback to mock
    await delay(500)
    return { data: { success: true, xpGained: 500, coinsGained: 100 } }
  }
}

export const completeLesson = async (courseId, lessonId) => {
  if (USE_MOCK) {
    await delay(400)
    return { data: { success: true, xpGained: 50, coinsGained: 10 } }
  }
  
  try {
    const response = await apiClient.post(`/courses/${courseId}/lessons/${lessonId}/complete`)
    return response
  } catch (error) {
    console.error('Error completing lesson:', error)
    // Fallback to mock
    await delay(400)
    return { data: { success: true, xpGained: 50, coinsGained: 10 } }
  }
}

