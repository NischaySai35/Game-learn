const mongoose = require("mongoose")

const certificateSchema = new mongoose.Schema({

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course"
  },

  certificateId: String,

  certificatePath: String,

  issuedDate: {
    type: Date,
    default: Date.now
  }

})

module.exports = mongoose.model("Certificate", certificateSchema)