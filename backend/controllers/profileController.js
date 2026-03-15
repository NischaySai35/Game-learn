const User = require("../models/User")
const Project = require("../models/Project")

exports.getSkillProfile = async (req, res) => {

  try {

    const user = await User.findById(req.params.userId)

    const projects = await Project.find({ userId: req.params.userId })

    res.json({
      name: user.name,
      skills: user.skillsToLearn,
      badge: user.badge,
      level: user.level,
      projects
    })

  } catch (error) {

    res.status(500).json({ error: error.message })

  }

}