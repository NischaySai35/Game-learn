const Quiz = require("../models/Quiz")
const User = require("../models/User")
const Leaderboard = require("../models/Leaderboard")

const calculateCoins = require("../utils/coinLogic")
const calculateXP = require("../utils/xpCalculator")
const updateStreak = require("../utils/streakLogic")



exports.getQuizByCourse = async (req, res) => {

  try {

    const quiz = await Quiz.find({ courseId: req.params.courseId })

    res.json(quiz)

  } 
  catch (error) {

    res.status(500).json({ error: error.message })

  }

}



exports.submitQuiz = async (req, res) => {

  try {

    const { userId, answers, quizType } = req.body
    // quizType → "practiceQuiz" or "peerCompetition"

    let score = 0

    for (const item of answers) {

      const question = await Quiz.findById(item.questionId)

      if (question && question.correctAnswer === item.answer) {
        score++
      }

    }

    const xpEarned = calculateXP("quiz", score)

    const coinsEarned = calculateCoins(quizType || "practiceQuiz", score)



    const user = await User.findById(userId)

    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    user.xp += xpEarned
    user.coins += coinsEarned

    user.streak = updateStreak(user.lastActiveDate, user.streak)

    user.lastActiveDate = new Date()

    await user.save()



    let leaderboard = await Leaderboard.findOne({ userId })

    if (!leaderboard) {

      leaderboard = new Leaderboard({
        userId,
        xp: user.xp,
        coins: user.coins
      })

    } 
    else {

      leaderboard.xp = user.xp
      leaderboard.coins = user.coins

    }

    await leaderboard.save()



    res.json({
      message: "Quiz submitted successfully",
      score,
      xpEarned,
      coinsEarned,
      streak: user.streak
    })

  } 
  catch (error) {

    res.status(500).json({ error: error.message })

  }

}