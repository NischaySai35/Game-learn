const express = require("express");
const router = express.Router();

const {
  submitProject,
  getUserProjects,
} = require("../controllers/projectController");

router.post("/submit", submitProject);
router.get("/user/:userId", getUserProjects);

module.exports = router;