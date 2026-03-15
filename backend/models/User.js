const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  roleInterest: String,

  coins: {
    type: Number,
    default: 0,
  },

  xp: {
    type: Number,
    default: 0,
  },

  streak: {
    type: Number,
    default: 0,
  },

  coursesCompleted: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
  ],
});

module.exports = mongoose.model("User", userSchema);