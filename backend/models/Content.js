const mongoose = require("mongoose")

const contentSchema = new mongoose.Schema({

  title: String,

  type: {
    type: String,
    enum: ["interview", "company", "advanced"]
  },

  description: String,

  role: String,

  cost: Number,

  questions: [String]

})

module.exports = mongoose.model("Content", contentSchema)