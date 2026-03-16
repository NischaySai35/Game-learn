const express = require("express")

const router = express.Router()

const { finishCompetition } = require("../controllers/competitionController")

router.post("/finish", finishCompetition)

module.exports = router