const Unlock = require("../models/Unlock")
const User = require("../models/User")
const Content = require("../models/Content")

// Unlock content using coins
exports.unlockContent = async (req, res) => {

  try {

    const { userId, contentId } = req.body

    // Check user
    const user = await User.findById(userId)
    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    // Check content
    const content = await Content.findById(contentId)
    if (!content) {
      return res.status(404).json({ message: "Content not found" })
    }

    // Check if already unlocked
    const alreadyUnlocked = await Unlock.findOne({ userId, contentId })

    if (alreadyUnlocked) {
      return res.json({
        message: "Content already unlocked",
        content
      })
    }

    // Check coins
    if (user.coins < content.cost) {
      return res.status(400).json({ message: "Not enough coins" })
    }

    // Deduct coins
    user.coins -= content.cost
    await user.save()

    // Save unlock record
    const unlock = new Unlock({
      userId,
      contentId
    })

    await unlock.save()

    res.json({
      message: "Content unlocked successfully",
      content
    })

  } catch (error) {

    res.status(500).json({
      error: error.message
    })

  }

}


// Get all unlocked content for a user
exports.getUnlockedContent = async (req, res) => {

  try {

    const { userId } = req.params

    const unlocked = await Unlock.find({ userId })
      .populate("contentId")

    res.json(unlocked)

  } catch (error) {

    res.status(500).json({
      error: error.message
    })

  }

}