const mongoose = require("mongoose")

const progressSchema = new mongoose.Schema({

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course"
  },

  // Topics
  completedTopics: [String],

  // Final Quiz
  finalQuizCompleted: {
    type: Boolean,
    default: false
  },

  finalQuizScore: {
    type: Number,
    default: 0
  },

  // Project
  projectSubmitted: {
    type: Boolean,
    default: false
  },

  projectStatus: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending"
  },

  projectScore: {
    type: Number,
    default: 0
  },

  projectFeedback: String,

  projectDetails: {
    title: String,
    githubLink: String,
    deploymentLink: String
  },

  // Final Completion
  isCompleted: {
    type: Boolean,
    default: false
  }

}, { timestamps: true })

module.exports = mongoose.model("CourseProgress", progressSchema)