const User = require("../models/User")
const updateStreak = require("../utils/streakLogic")

exports.updateLearningTime = async (req, res) => {
  try {
    const userId = req.user.id
    const { minutes } = req.body

    const user = await User.findById(userId)

    const previousTime = user.todayLearningTime || 0
    // Call the external streak logic (it modifies the user object in place)
    updateStreak(user, minutes)

    const goalReached = previousTime < user.dailyLearningTarget && user.todayLearningTime >= user.dailyLearningTarget
    const streakRecovered = false // Add your recovery logic here if needed

    await user.save()

    res.json({
      user,
      goalReached,
      streakRecovered
    })

  } catch (error) {

    res.status(500).json({ error: error.message })

  }

}