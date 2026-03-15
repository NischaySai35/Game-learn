const express = require("express")

const router = express.Router()

const {
  getQuizByCourse,
  submitQuiz
} = require("../controllers/quizController")


router.get("/:courseId", getQuizByCourse)

router.post("/submit", submitQuiz)


module.exports = router