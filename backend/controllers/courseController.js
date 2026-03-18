const Course = require("../models/Course")

// Get all courses
exports.getCourses = async (req, res) => {
  try {
    const courses = await Course.find()
    res.json(courses)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Create course
exports.createCourse = async (req, res) => {
  try {
    const { title, description, role, topics } = req.body

    if (!title || !role) {
      return res.status(400).json({ message: "Missing fields" })
    }

    const course = await Course.create({
      title,
      description,
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