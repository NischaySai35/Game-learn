const express = require("express")
const router = express.Router()

const { getSkillProfile } = require("../controllers/profileController")

router.get("/:userId", getSkillProfile)

module.exports = router