const express = require("express")
const router = express.Router()

const {
  unlockContent,
  getUnlockedContent
} = require("../controllers/unlockController")

// unlock content
router.post("/", unlockContent)

// view unlocked content
router.get("/:userId", getUnlockedContent)

module.exports = router