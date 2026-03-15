const mongoose = require("mongoose")

const progressSchema = new mongoose.Schema({

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course"
  },

  completedTopics: [{
    type: String
  }],

  quizzesCompleted: Number,

  projectSubmitted: Boolean,

  progressPercentage: Number

})

module.exports = mongoose.model("CourseProgress", progressSchema)