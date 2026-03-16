const Content = require("../models/Content")

// Add new content
exports.createContent = async (req, res) => {
  try {
    const content = new Content(req.body)
    await content.save()

    res.status(201).json(content)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Get all content
exports.getAllContent = async (req, res) => {
  try {
    const content = await Content.find()
    res.json(content)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Get content by type
exports.getContentByType = async (req, res) => {
  try {
    const content = await Content.find({ type: req.params.type })
    res.json(content)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Get single content
exports.getContentById = async (req, res) => {
  try {
    const content = await Content.findById(req.params.id)
    res.json(content)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}