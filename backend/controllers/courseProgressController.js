const CourseProgress = require("../models/CourseProgress")

// Get User's Progress in a Course
exports.getProgress = async (req, res) => {
  try {
    const { userId, courseId } = req.params
    
    const progress = await CourseProgress.findOne({
      userId,
      courseId
    })

    if (progress) {
      res.json(progress)
    } else {
      // Return default progress if not found
      res.json({
        userId,
        courseId,
        completedTopics: [],
        quizzesCompleted: 0,
        projectSubmitted: false,
        progressPercentage: 0
      })
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch progress" })
  }
}

// Update Topic Progress
exports.updateTopicProgress = async (req, res) => {
  try {
    const { userId, courseId, topicId } = req.body

    let progress = await CourseProgress.findOne({ userId, courseId })

    if (!progress) {
      progress = new CourseProgress({
        userId,
        courseId,
        completedTopics: [topicId]
      })
    } else {
      if (!progress.completedTopics.includes(topicId)) {
        progress.completedTopics.push(topicId)
      }
    }

    await progress.save()
    res.json(progress)
  } catch (error) {
    res.status(500).json({ error: "Failed to update progress" })
  }
}