const mongoose = require("mongoose")

const projectSchema = new mongoose.Schema({

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true
  },

  title: {
    type: String,
    required: true
  },

  description: String,

  githubLink: {
    type: String,
    required: true
  },

  deploymentLink: String,

  // Evaluation status
  status: {
    type: String,
    enum: ["pending", "evaluated"],
    default: "pending"
  },

  // AI Results
  aiScore: {
    type: Number,
    default: 0
  },

  aiFeedback: {
    type: String
  },

  submittedAt: {
    type: Date,
    default: Date.now
  }

}, { timestamps: true })

module.exports = mongoose.model("Project", projectSchema)