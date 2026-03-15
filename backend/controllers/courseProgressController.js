const CourseProgress = require("../models/CourseProgress")

exports.getProgress = async (req, res) => {

  try {

    const progress = await CourseProgress.findOne({
      userId: req.params.userId,
      courseId: req.params.courseId
    })

    res.json(progress)

  } catch (error) {

    res.status(500).json({ error: error.message })

  }

}


exports.updateTopicProgress = async (req, res) => {

  try {

    const { userId, courseId, topic } = req.body

    let progress = await CourseProgress.findOne({ userId, courseId })

    if (!progress) {

      progress = new CourseProgress({
        userId,
        courseId,
        completedTopics: []
      })

    }

    if (!progress.completedTopics.includes(topic)) {
      progress.completedTopics.push(topic)
    }

    progress.progressPercentage =
      (progress.completedTopics.length / 10) * 100

    await progress.save()

    res.json(progress)

  } catch (error) {

    res.status(500).json({ error: error.message })

  }

}