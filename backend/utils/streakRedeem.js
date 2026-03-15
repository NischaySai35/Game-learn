function redeemStreak(user, minutesLearnedToday) {

  const totalRequired = user.dailyLearningTarget + user.missedLearningTime

  if (minutesLearnedToday >= totalRequired) {

    user.streak += 1
    user.missedLearningTime = 0
    user.todayLearningTime = 0

    return {
      redeemed: true,
      message: "Streak restored!"
    }

  }

  return {
    redeemed: false,
    remaining: totalRequired - minutesLearnedToday
  }

}

module.exports = redeemStreak