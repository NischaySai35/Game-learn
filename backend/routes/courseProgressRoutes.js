const express = require("express")
const router = express.Router()

const {
  getProgress,
  updateTopicProgress
} = require("../controllers/courseProgressController")

router.get("/:userId/:courseId", getProgress)

router.post("/update", updateTopicProgress)

module.exports = router