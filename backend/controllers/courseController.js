const Course = require("../models/Course")

// Mock courses data for fallback
const mockCourses = [
  {
    title: 'React Fundamentals',
    category: 'Web Development',
    difficulty: 'Beginner',
    progress: 75,
    icon: '⚛️',
    color: '#61dafb',
    description: 'Learn the basics of React and component-based architecture',
    lessons: 12,
    completed: 9,
  },
  {
    title: 'JavaScript Essentials',
    category: 'Web Development',
    difficulty: 'Beginner',
    progress: 90,
    icon: '🟨',
    color: '#f7df1e',
    description: 'Master JavaScript from the ground up',
    lessons: 15,
    completed: 13,
  },
  {
    title: 'Data Structures & Algorithms',
    category: 'Computer Science',
    difficulty: 'Intermediate',
    progress: 45,
    icon: '📊',
    color: '#39FF14',
    description: 'Deep dive into DSA with practical examples',
    lessons: 20,
    completed: 9,
  },
  {
    title: 'Machine Learning Basics',
    category: 'AI & ML',
    difficulty: 'Intermediate',
    progress: 30,
    icon: '🤖',
    color: '#FF6B6B',
    description: 'Introduction to ML algorithms and applications',
    lessons: 18,
    completed: 5,
  },
  {
    title: 'Advanced CSS & Design',
    category: 'Web Development',
    difficulty: 'Intermediate',
    progress: 60,
    icon: '🎨',
    color: '#FF00FF',
    description: 'Create stunning UI with modern CSS techniques',
    lessons: 14,
    completed: 8,
  },
  {
    title: 'Node.js & Express',
    category: 'Backend Development',
    difficulty: 'Intermediate',
    progress: 50,
    icon: '🟢',
    color: '#68a063',
    description: 'Build robust server-side applications',
    lessons: 16,
    completed: 8,
  },
  {
    title: 'Database Design',
    category: 'Database',
    difficulty: 'Intermediate',
    progress: 35,
    icon: '🗄️',
    color: '#00D4FF',
    description: 'SQL, NoSQL, and data modeling best practices',
    lessons: 14,
    completed: 5,
  },
  {
    title: 'Cloud Computing with AWS',
    category: 'Cloud',
    difficulty: 'Advanced',
    progress: 20,
    icon: '☁️',
    color: '#FFD700',
    description: 'Deploy and scale applications on AWS',
    lessons: 20,
    completed: 4,
  },
  {
    title: 'DevOps & CI/CD',
    category: 'DevOps',
    difficulty: 'Advanced',
    progress: 15,
    icon: '🚀',
    color: '#00D9FF',
    description: 'Continuous integration and deployment pipelines',
    lessons: 18,
    completed: 3,
  },
  {
    title: 'Cybersecurity Basics',
    category: 'Security',
    difficulty: 'Intermediate',
    progress: 40,
    icon: '🔒',
    color: '#FF1493',
    description: 'Secure your applications and infrastructure',
    lessons: 16,
    completed: 6,
  },
  {
    title: 'Python for Data Science',
    category: 'Data Science',
    difficulty: 'Intermediate',
    progress: 55,
    icon: '🐍',
    color: '#3776ab',
    description: 'Data analysis with Python and pandas',
    lessons: 17,
    completed: 9,
  },
  {
    title: 'TypeScript Mastery',
    category: 'Web Development',
    difficulty: 'Advanced',
    progress: 25,
    icon: '📘',
    color: '#3178c6',
    description: 'Advanced TypeScript patterns and best practices',
    lessons: 16,
    completed: 4,
  },
]

// Get all courses
exports.getCourses = async (req, res) => {
  try {
    let courses = await Course.find()
    
    // If no courses in database, return mock data
    if (courses.length === 0) {
      return res.json(mockCourses)
    }
    
    res.json(courses)
  } catch (error) {
    console.error('Error fetching courses:', error)
    // Fallback to mock data on error
    res.json(mockCourses)
  }
}

// Create course
exports.createCourse = async (req, res) => {
  try {
    const { title, description, category, difficulty, icon, color, lessons, completed, progress, role, topics } = req.body

    if (!title) {
      return res.status(400).json({ message: "Missing fields" })
    }

    const course = await Course.create({
      title,
      description,
      category,
      difficulty,
      icon,
      color,
      lessons,
      completed,
      progress,
      role,
      topics
    })

    res.status(201).json(course)

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Get single course
exports.getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id)

    if (!course) {
      return res.status(404).json({ message: "Course not found" })
    }

    res.json(course)

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}