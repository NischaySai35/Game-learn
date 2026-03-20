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
// GET TOPIC BY ID
// ============================================
exports.getTopicById = async (req, res) => {
  try {
    const { id, topicId } = req.params;

    const course = await Course.findById(id);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    const topic = course.topics?.id(topicId);

    if (!topic) {
      return res.status(404).json({ message: "Topic not found" });
    }

    // Generate rich educational content with explanations and quizzes
    const topicContent = {
      ...topic.toObject(),
      
      // 3 explanation sets with 3 points each
      explanationSets: [
        {
          id: 1,
          title: `Understanding ${topic.title} - Fundamentals`,
          points: [
            `${topic.title} is a core concept in web development that forms the foundation for modern applications.`,
            `The first principle is understanding the basic structure and syntax specific to ${topic.title}.`,
            `Practice with hands-on examples to solidify your understanding of the core concepts.`
          ]
        },
        {
          id: 2,
          title: `${topic.title} - Best Practices`,
          points: [
            `Always follow industry best practices when working with ${topic.title}.`,
            `Performance optimization is crucial when implementing ${topic.title} in production environments.`,
            `Testing and debugging are essential parts of mastering ${topic.title} effectively.`
          ]
        },
        {
          id: 3,
          title: `${topic.title} - Advanced Concepts`,
          points: [
            `Advanced developers leverage ${topic.title} to build scalable and maintainable systems.`,
            `Understanding edge cases and common pitfalls will make you a better developer.`,
            `Continuous learning and staying updated with ${topic.title} trends ensures your skills remain relevant.`
          ]
        }
      ],

      // 3 quiz questions interspersed
      quizzes: [
        {
          id: 1,
          question: `What is the primary purpose of ${topic.title}?`,
          options: [
            "To improve code readability",
            "To increase application performance",
            "To provide foundational concepts for modern development",
            "To replace other technologies"
          ],
          correctAnswer: 2,
          explanation: `${topic.title} provides foundational concepts that are essential for understanding modern development.`
        },
        {
          id: 2,
          question: `Which is NOT a best practice for ${topic.title}?`,
          options: [
            "Following industry standards",
            "Optimizing for performance",
            "Ignoring security concerns",
            "Writing testable code"
          ],
          correctAnswer: 2,
          explanation: "Security is always a critical concern and should never be ignored in any development practice."
        },
        {
          id: 3,
          question: `How can you master ${topic.title}?`,
          options: [
            "By reading documentation once",
            "Through continuous practice and learning",
            "By copying code from others",
            "Only by watching tutorials"
          ],
          correctAnswer: 1,
          explanation: "Mastery comes through consistent practice, hands-on experience, and continuous learning."
        }
      ]
    };

    res.json(topicContent);
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

    // Safe extraction of skills and convert to Regex for case-insensitive matching
    const skills = (user.skillsProgress || []).map(s => new RegExp(s.skill, 'i'));

    // ============================================
    // RECOMMENDED COURSES (Role OR Skills match)
    // ============================================
    const recommended = await Course.find({
      $or: [
        { role: { $in: roles } },
        { skills: { $in: skills } }
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