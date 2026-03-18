const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true
  },

  interestedRoles: [{
    type: String
  }],

  skillsProgress: [
    {
      skill: String,
      progress: {
        type: Number,
        default: 0
      }
    }
  ],

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

}, { timestamps: true })

module.exports = mongoose.model("User", userSchema)