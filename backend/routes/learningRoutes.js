const express = require("express")
const router = express.Router()

const { updateLearningTime } = require("../controllers/learningController")
const authMiddleware = require("../middleware/authMiddleware")

router.post("/time", authMiddleware, updateLearningTime)

module.exports = router