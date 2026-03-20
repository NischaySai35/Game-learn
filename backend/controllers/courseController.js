const Course = require("../models/Course");
const User = require("../models/User");

// ============================================
// GET ALL COURSES
// ============================================
exports.getCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (error) {
    console.error("Error fetching courses:", error);
    res.status(500).json({ message: error.message });
  }
};

// ============================================
// CREATE COURSE
// ============================================
exports.createCourse = async (req, res) => {
  try {
    const course = await Course.create(req.body);
    res.status(201).json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ============================================
// GET SINGLE COURSE
// ============================================
exports.getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ============================================
// GET COURSE TOPICS
// ============================================
exports.getCourseTopics = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.json({
      topics: course.topics || []
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ============================================
// GET PERSONALIZED COURSES
// ============================================
exports.getPersonalizedCourses = async (req, res) => {
  try {
    const userId = req.params.userId;

    // Get user
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const roles = user.interestedRoles || [];

    // Safe extraction of skills
    const skills = (user.skillsProgress || []).map(s => s.skill);

    // ============================================
    // RECOMMENDED COURSES (Role OR Category match)
    // ============================================
    const recommended = await Course.find({
      $or: [
        { role: { $in: roles } },
        { category: { $in: skills } }
      ]
    });

    // Get IDs of recommended
    const recommendedIds = recommended.map(c => c._id);

    // ============================================
    // EXPLORE COURSES (Remaining)
    // ============================================
    const explore = await Course.find({
      _id: { $nin: recommendedIds }
    });

    // ============================================
    // RESPONSE
    // ============================================
    res.json({
      recommended,
      explore
    });

  } catch (error) {
    console.error("Error in personalized courses:", error);
    res.status(500).json({ message: error.message });
  }
};