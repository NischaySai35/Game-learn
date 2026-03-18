const express = require("express")
const router = express.Router()

const {
  startTopic,
  getStep,
  submitAnswer,
  nextStep,
  completeTopic
} = require("../controllers/topicController")

const authMiddleware = require("../middleware/authMiddleware")

router.post("/start", authMiddleware, startTopic)
router.get("/step/:progressId", authMiddleware, getStep)
router.post("/answer", authMiddleware, submitAnswer)
router.post("/next", authMiddleware, nextStep)
router.post("/complete", authMiddleware, completeTopic)

module.exports = router