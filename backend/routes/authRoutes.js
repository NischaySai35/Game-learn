const express = require("express")
const router = express.Router()

const {
  register,
  login,
  completeOnboarding,
  getCurrentUser,
  updateProfile,
  verifyToken
} = require("../controllers/authController")

const authMiddleware = require("../middleware/authMiddleware")

// ================= PUBLIC =================
router.post("/signup", register)
router.post("/login", login)

// ================= PROTECTED =================
router.get("/me", authMiddleware, getCurrentUser)
router.post("/onboarding", authMiddleware, completeOnboarding)
router.put("/update-profile", authMiddleware, updateProfile)
router.get("/verify", authMiddleware, verifyToken)


module.exports = router

console.log("DEBUG TYPES:", {
  authMiddleware: typeof authMiddleware,
  getCurrentUser: typeof getCurrentUser,
  completeOnboarding: typeof completeOnboarding,
  updateProfile: typeof updateProfile,
  verifyToken: typeof verifyToken
})