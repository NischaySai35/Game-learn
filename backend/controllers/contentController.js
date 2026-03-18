const Content = require("../models/Content")

// Create premium content
exports.createContent = async (req, res) => {
  try {

    const { title, type, description, role, cost } = req.body

    if (!title || !type) {
      return res.status(400).json({ message: "Missing fields" })
    }

    const content = await Content.create({
      title,
      type,
      description,
      role,
      cost
    })

    res.status(201).json(content)

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}


// Get all premium content
exports.getAllContent = async (req, res) => {
  try {

    const content = await Content.find()

    res.json(content)

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}


// Get locked content only
exports.getPremiumContent = async (req, res) => {
  try {

    const content = await Content.find({ cost: { $gt: 0 } })

    res.json(content)

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}


// Get by role
exports.getContentByRole = async (req, res) => {
  try {

    const content = await Content.find({ role: req.params.role })

    res.json(content)

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}