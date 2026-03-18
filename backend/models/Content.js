const mongoose = require("mongoose")

const contentSchema = new mongoose.Schema({

  title: {
    type: String,
    required: true
  },

  category: {
    type: String,
    enum: ["course", "interview", "company", "advanced"],
    required: true
  },

  description: {
    type: String,
    required: true
  },

  role: {
    type: String,
    required: true
  },

  isLocked: {
    type: Boolean,
    default: false
  },

  cost: {
    type: Number,
    default: 0
  },

  questions: [String]

}, { timestamps: true })

// VALIDATION: cost only if locked
contentSchema.pre("save", function (next) {

  if (this.isLocked && this.cost <= 0) {
    return next(new Error("Locked content must have a cost"))
  }

  if (!this.isLocked) {
    this.cost = 0
  }

  next()
})

module.exports = mongoose.model("Content", contentSchema)