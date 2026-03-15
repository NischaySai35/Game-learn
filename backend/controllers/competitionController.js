const calculateCoins = require("../utils/coinLogic")
const calculateRanking = require("../utils/competitionLogic")
const User = require("../models/User")

exports.finishCompetition = async (req, res) => {

  try {

    const { results } = req.body

    const rankedUsers = calculateRanking(results)

    for (const player of rankedUsers) {

      const coins = calculateCoins("peerCompetition", player.score, player.rank)

      const user = await User.findById(player.userId)

      user.coins += coins

      await user.save()

      player.coinsEarned = coins

    }

    res.json(rankedUsers)

  }

  catch(error) {

    res.status(500).json({ error: error.message })

  }

}