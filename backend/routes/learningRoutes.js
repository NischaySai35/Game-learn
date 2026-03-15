const express = require("express")
const router = express.Router()

const { updateLearningTime } = require("../controllers/learningController")

router.post("/time", updateLearningTime)

module.exports = router