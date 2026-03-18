// utils/logActivity.js

const Activity = require("../models/Activity")

async function logActivity(userId, data) {
  await Activity.create({
    userId,
    ...data
  })
}

module.exports = logActivity