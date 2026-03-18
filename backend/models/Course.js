const mongoose = require("mongoose")

const courseSchema = new mongoose.Schema({

  title: String,

  description: String,

  role: String,

  topics: [
    {
      title: String
    }
  ]

})

module.exports = mongoose.model("Course", courseSchema)