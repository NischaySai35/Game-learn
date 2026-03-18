const mongoose = require("mongoose")

const topicSessionSchema = new mongoose.Schema({

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  topicId: String,

  // GENERATED CONTENT (IMPORTANT)
  steps: [
    {
      type: {
        type: String, // explanation | mcq
      },

      content: String, // explanation text

      question: String,
      options: [String],
      answer: String
    }
  ],

  currentStep: {
    type: Number,
    default: 0
  },

  completedSteps: [Number],

  answers: [
    {
      step: Number,
      selected: String,
      correct: Boolean
    }
  ],

  isCompleted: {
    type: Boolean,
    default: false
  }

}, { timestamps: true })

module.exports = mongoose.model("TopicSession", topicSessionSchema)