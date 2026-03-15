const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  title: String,
  category: String,
  difficulty: String,

  modules: [
    {
      title: String,
      lessons: [String],
    },
  ],
});

module.exports = mongoose.model("Course", courseSchema);