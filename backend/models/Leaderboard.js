const mongoose = require("mongoose");

const leaderboardSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  xp: {
    type: Number,
    default: 0,
  },

  coins: {
    type: Number,
    default: 0,
  },

  rank: {
    type: Number,
  },
  streak: {
    type: Number,
    default: 0
  },
});

module.exports = mongoose.model("Leaderboard", leaderboardSchema);