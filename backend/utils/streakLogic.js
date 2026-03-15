function updateStreak(user, minutesLearnedToday) {

  const today = new Date()
  const lastDate = user.lastActiveDate ? new Date(user.lastActiveDate) : null

  user.todayLearningTime += minutesLearnedToday

  if (user.todayLearningTime >= user.dailyLearningTarget) {

    user.streak += 1
    user.todayLearningTime = 0
    user.lastActiveDate = today

  } 
  else {

    const remaining = user.dailyLearningTarget - user.todayLearningTime
    user.missedLearningTime = remaining

  }

  return user
}

module.exports = updateStreak