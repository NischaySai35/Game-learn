const mongoose = require("mongoose")

const competitionSchema = new mongoose.Schema({

  quizId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Quiz"
  },

  participants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }],

  winner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  createdAt: {
    type: Date,
    default: Date.now
  }

})

module.exports = mongoose.model("Competition", competitionSchema)