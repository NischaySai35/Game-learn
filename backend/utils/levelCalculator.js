function calculateLevel(xp) {

  if (xp >= 1000) return 4
  if (xp >= 500) return 3
  if (xp >= 200) return 2

  return 1

}

module.exports = calculateLevel