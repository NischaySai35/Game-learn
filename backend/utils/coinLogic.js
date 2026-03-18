function calculateCoins(activity, score, rank = null) {

  if (activity === "practiceQuiz") {
    return score * 3
  }

  if (activity === "peerCompetition") {

    if (rank === 1) return 100
    if (rank === 2) return 70
    if (rank === 3) return 50

    return score * 5
  }

  if (activity === "topicCompletion") {
    return 2
  }

  if (activity === "courseCompletion") {
    return 50
  }

  if (activity === "projectSubmission") {
    return 75
  }

  return 0
}

module.exports = calculateCoins