const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({

  name: String,

  email: {
    type: String,
    unique: true
  },

  password: String,

  interestedRoles: [{
    type: String
  }],

  skillsToLearn: [{
    type: String
  }],

  xp: {
    type: Number,
    default: 0
  },

  coins: {
    type: Number,
    default: 0
  },

  streak: {
    type: Number,
    default: 0
  },

  dailyLearningTarget: {
    type: Number,
    default: 60
  },

  todayLearningTime: {
    type: Number,
    default: 0
  },

  missedLearningTime: {
    type: Number,
    default: 0
  },

  level: {
    type: Number,
    default: 1
  },

  badge: {
    type: String,
    default: "Starter"
  }

})

module.exports = mongoose.model("User", userSchema)