const express = require("express");
const router = express.Router();

const {
  getCourses,
  createCourse,
  getCourseById,
  getCourseTopics, 
  getPersonalizedCourses
} = require("../controllers/courseController");


// GET all courses
router.get("/", getCourses);

// GET personalized courses
router.get("/personalized/:userId", getPersonalizedCourses);

// GET course topics
router.get("/:id/topics", getCourseTopics);

// GET single course
router.get("/:id", getCourseById);

// CREATE course
router.post("/", createCourse);

module.exports = router;