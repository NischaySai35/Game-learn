const mongoose = require("mongoose")

const competitionSchema = new mongoose.Schema({

  quizId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Quiz"
  },

  participants: [
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      },

      score: {
        type: Number,
        default: 0
      },

      rank: {
        type: Number
      }
    }
  ],

  winner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  status: {
    type: String,
    enum: ["waiting", "ongoing", "completed"],
    default: "waiting"
  },

  createdAt: {
    type: Date,
    default: Date.now
  }

})

module.exports = mongoose.model("Competition", competitionSchema)