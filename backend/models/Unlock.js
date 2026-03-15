const mongoose = require("mongoose")

const unlockSchema = new mongoose.Schema({

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  contentType: String,

  contentName: String,

  cost: Number

})

module.exports = mongoose.model("Unlock", unlockSchema)