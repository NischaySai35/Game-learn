const User = require("../models/User")
const updateStreak = require("../utils/streakLogic")

exports.updateLearningTime = async (req, res) => {

  try {

    const { userId, minutes } = req.body

    const user = await User.findById(userId)

    user.todayLearningTime += minutes

    updateStreak(user)

    await user.save()

    res.json({
      todayLearningTime: user.todayLearningTime,
      streak: user.streak
    })

  } catch (error) {

    res.status(500).json({ error: error.message })

  }

}