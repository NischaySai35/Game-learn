const User = require("../models/User")
const Project = require("../models/Project")
const Activity = require("../models/Activity")

exports.getSkillProfile = async (req, res) => {

  try {

    const userId = req.params.userId

    const user = await User.findById(userId)

    const projects = await Project.find({ userId })

    // Fetch recent activity
    const activities = await Activity
      .find({ userId })
      .sort({ createdAt: -1 })
      .limit(10)

    res.json({
      name: user.name,
      skills: user.skillsProgress, // fix here
      badge: user.badge,
      level: user.level,
      xp: user.xp,
      coins: user.coins,
      streak: user.streak,
      projects,
      recentActivity: activities   // added
    })

  } catch (error) {

    res.status(500).json({ error: error.message })

  }

}