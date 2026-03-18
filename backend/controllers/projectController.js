const Project = require("../models/Project")
const CourseProgress = require("../models/CourseProgress")
const User = require("../models/User")

const { evaluateProject } = require("../services/ai/projectService")
const calculateCoins = require("../utils/calculateCoins")
const logActivity = require("../utils/logActivity")

// Submit Project
exports.submitProject = async (req, res) => {

  try {

    const { title, githubLink, deploymentLink, courseId } = req.body
    const userId = req.user.id

    // Create project (initially pending)
    const project = await Project.create({
      userId,
      courseId,
      title,
      githubLink,
      deploymentLink
    })

    // Respond immediately (fast UX)
    res.json({
      message: "Project submitted. AI evaluation in progress...",
      project
    })

    // Run AI evaluation in background 
    try {

      const aiResult = await evaluateProject(githubLink, deploymentLink)

      // Update project with AI results
      project.aiScore = aiResult.score
      project.status = "evaluated"

      await project.save()

      // If passed → update progress
      if (aiResult.score >= 60) {

        const progress = await CourseProgress.findOne({ userId, courseId })

        if (progress) {
          progress.projectSubmitted = true
          await progress.save()
        }

        // Reward user 
        const user = await User.findById(userId)

        const coins = calculateCoins("projectSubmission")
        user.coins += coins
        user.xp += 50   // optional XP

        await user.save()

        // Log activity 
        await logActivity(userId, {
          type: "PROJECT_SUBMITTED",
          title: `Project evaluated (Score: ${aiResult.score})`,
          coins,
          xp: 50
        })

      }

    } catch (err) {
      console.error("AI Evaluation Failed:", err.message)
    }

  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}


// Get all projects of a user
exports.getUserProjects = async (req, res) => {

  try {

    const projects = await Project
      .find({ userId: req.params.userId })
      .sort({ createdAt: -1 })

    res.json(projects)

  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}