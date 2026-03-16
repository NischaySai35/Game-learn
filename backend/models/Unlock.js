const mongoose = require("mongoose")

const unlockSchema = new mongoose.Schema({

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  contentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Content"
  },

  unlockedAt: {
    type: Date,
    default: Date.now
  }

})

module.exports = mongoose.model("Unlock", unlockSchema)