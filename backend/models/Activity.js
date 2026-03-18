const mongoose = require("mongoose")

const activitySchema = new mongoose.Schema({

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  type: {
    type: String,
    enum: [
      "TOPIC_COMPLETED",
      "BADGE_EARNED",
      "COINS_EARNED",
      "COURSE_COMPLETED",
      "PROJECT_SUBMITTED",
      "STREAK",
      "XP_GAINED"
    ]
  },

  title: String,     // short text
  description: String, // detailed message

  coins: Number,
  xp: Number,

  createdAt: {
    type: Date,
    default: Date.now
  }

})

module.exports = mongoose.model("Activity", activitySchema)