const mongoose = require("mongoose")

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },

  description: String,

  category: String,

  difficulty: {
    type: String,
    enum: ["Beginner", "Intermediate", "Advanced"],
    default: "Beginner"
  },

  icon: String,

  color: String,

  lessons: {
    type: Number,
    default: 0
  },

  completed: {
    type: Number,
    default: 0
  },

  progress: {
    type: Number,
    default: 0
  },

  role: [String],

  skills: [String],

  topics: [
    {
      title: String,
      description: String,
      icon: String
    }
  ]

}, { timestamps: true })

module.exports = mongoose.model("Course", courseSchema)