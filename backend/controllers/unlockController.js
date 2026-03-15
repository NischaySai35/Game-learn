const Unlock = require("../models/Unlock")
const User = require("../models/User")

exports.unlockContent = async (req, res) => {

  try {

    const { userId, contentName, cost } = req.body

    const user = await User.findById(userId)

    if (user.coins < cost) {
      return res.status(400).json({ message: "Not enough coins" })
    }

    user.coins -= cost
    await user.save()

    const unlock = new Unlock({
      userId,
      contentName,
      cost
    })

    await unlock.save()

    res.json({
      message: "Content unlocked",
      coinsRemaining: user.coins
    })

  } catch (error) {

    res.status(500).json({ error: error.message })

  }

}