const User = require("../models/User")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

// REGISTER
exports.register = async (req, res) => {
  try {

    const { name, email, password, interestedRoles, dailyLearningTarget } = req.body

    // validation
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" })
    }

    // check existing user
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" })
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      interestedRoles,
      dailyLearningTarget
    })

    // remove password from response
    const userData = user.toObject()
    delete userData.password

    res.status(201).json(userData)

  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}


// LOGIN
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