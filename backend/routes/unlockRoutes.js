const express = require("express")
const router = express.Router()

const { unlockContent } = require("../controllers/unlockController")

router.post("/", unlockContent)

module.exports = router