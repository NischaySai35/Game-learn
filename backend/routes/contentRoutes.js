const express = require("express")
const router = express.Router()

const {
  createContent,
  getAllContent,
  getContentByType,
  getContentById
} = require("../controllers/contentController")

router.post("/", createContent)
router.get("/", getAllContent)
router.get("/type/:type", getContentByType)
router.get("/:id", getContentById)

module.exports = router