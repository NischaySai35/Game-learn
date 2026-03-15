const Leaderboard = require("../models/Leaderboard")

exports.getLeaderboard = async (req, res) => {

  try {

    const leaderboard = await Leaderboard
      .find()
      .populate("userId", "name")
      .sort({ xp: -1, streak: -1 })

    res.json(leaderboard)

  } catch (error) {

    res.status(500).json({ error: error.message })

  }

}