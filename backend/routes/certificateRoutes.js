const express = require("express")

const router = express.Router()

const {
  createCertificate
} = require("../controllers/certificateController")

router.post("/generate", createCertificate)

module.exports = router