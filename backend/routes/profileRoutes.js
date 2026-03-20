const express = require("express")
const router = express.Router()

const {
  getSkillProfile,
  updateProfile,
  updateSkills
} = require("../controllers/profileController")

const authMiddleware = require("../middleware/authMiddleware")

// Get logged-in user profile
router.get("/me", authMiddleware, getSkillProfile)

// Update profile
router.put("/me", authMiddleware, updateProfile)

// Update skills
router.put("/skills", authMiddleware, updateSkills)

module.exports = router