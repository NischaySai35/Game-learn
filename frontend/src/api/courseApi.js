import { mockCourses, mockDailyChallenges, mockCourseTopics } from './mockData'

// Simulate API delay
const delay = (ms = 300) => new Promise(resolve => setTimeout(resolve, ms))

export const getCourses = async () => {
  await delay(400)
  return { data: mockCourses }
}

export const getCourseTopics = async (courseId) => {
  await delay(300)
  const courseTopic = mockCourseTopics.find(entry => entry.courseId === Number(courseId))
  if (!courseTopic) throw new Error('Course topics not found')
  return { data: courseTopic }
}

export const getTopicById = async (courseId, topicId) => {
  await delay(250)
  const courseTopic = mockCourseTopics.find(entry => entry.courseId === Number(courseId))
  if (!courseTopic) throw new Error('Course topics not found')
  const topic = courseTopic.topics.find(t => t.id === topicId)
  if (!topic) throw new Error('Topic not found')
  return { data: topic }
}

export const getCourseById = async (id) => {
  await delay(300)
  const course = mockCourses.find(c => c.id === parseInt(id))
  if (!course) throw new Error('Course not found')
  return { data: course }
}

export const searchCourses = async (query) => {
  await delay(300)
  const results = mockCourses.filter(
    c => c.title.toLowerCase().includes(query.toLowerCase()) ||
         c.category.toLowerCase().includes(query.toLowerCase())
  )
  return { data: results }
}

export const getCoursesByCategory = async (category) => {
  await delay(300)
  const courses = mockCourses.filter(c => c.category === category)
  return { data: courses }
}

export const getCoursesProgress = async () => {
  await delay(400)
  const courseProgress = mockCourses.map(course => ({
    id: course.id,
    title: course.title,
    progress: course.progress,
    category: course.category,
  }))
  return { data: courseProgress }
}

export const getDailyChallenges = async () => {
  await delay(300)
  return { data: mockDailyChallenges }
}

export const completeCourse = async (courseId) => {
  await delay(500)
  return { data: { success: true, xpGained: 500, coinsGained: 100 } }
}

export const completeLesson = async (courseId, lessonId) => {
  await delay(400)
  return { data: { success: true, xpGained: 50, coinsGained: 10 } }
}
