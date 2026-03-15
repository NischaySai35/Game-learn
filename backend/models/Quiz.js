const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema({
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
  },

  question: {
    type: String,
    required: true,
  },

  options: [
    {
      type: String,
    },
  ],

  correctAnswer: {
    type: String,
    required: true,
  },

  points: {
    type: Number,
    default: 20,
  },
});

module.exports = mongoose.model("Quiz", quizSchema);