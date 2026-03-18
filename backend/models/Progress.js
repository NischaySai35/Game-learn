const mongoose = require("mongoose")

const progressSchema = new mongoose.Schema({

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  topicId: String,

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

})

module.exports = mongoose.model("Progress", progressSchema)