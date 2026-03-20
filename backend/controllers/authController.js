const User = require("../models/User")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

// ================= REGISTER =================
exports.register = async (req, res) => {
  try {

    const {
      name,
      email,
      password,
      interestedRoles,
      skills,
      dailyLearningTarget
    } = req.body

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" })
    }

    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const skillsProgress = (skills || []).map(skill => ({
      skill,
      progress: 0
    }))

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      interestedRoles,
      skillsProgress,
      dailyLearningTarget,
      hasCompletedOnboarding: false
    })

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    )

    const userData = user.toObject()
    delete userData.password

    res.status(201).json({ token, user: userData })

  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// ================= LOGIN =================
exports.login = async (req, res) => {
  try {

    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" })
    }

    const user = await User.findOne({ email })

    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    const match = await bcrypt.compare(password, user.password)

    if (!match) {
      return res.status(400).json({ message: "Invalid password" })
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    )

    const userData = user.toObject()
    delete userData.password

    res.json({
      token,
      user: userData
    })

  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// ================= GET CURRENT USER =================
exports.getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password")

    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    res.json(user)

  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// ================= COMPLETE ONBOARDING =================
exports.completeOnboarding = async (req, res) => {
  try {

    const { interestedRoles, skillsProgress, dailyLearningTarget } = req.body

    const user = await User.findByIdAndUpdate(
      req.user.id,
      {
        interestedRoles,
        skillsProgress,
        dailyLearningTarget,
        hasCompletedOnboarding: true
      },
      { new: true }
    ).select("-password")

    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    res.json(user)

  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// ================= UPDATE PROFILE =================
exports.updateProfile = async (req, res) => {
  try {

    const user = await User.findByIdAndUpdate(
      req.user.id,
      req.body,
      { new: true }
    ).select("-password")

    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    res.json(user)

  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// ================= VERIFY TOKEN =================
exports.verifyToken = async (req, res) => {
  try {
    res.json({ valid: true })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
