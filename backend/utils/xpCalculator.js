function calculateXP(type, score) {

  if (type === "quiz") {
    return score * 10
  }

  if (type === "course") {
    return 100
  }

  if (type === "project") {
    return 150
  }

  return 0
}

module.exports = calculateXP