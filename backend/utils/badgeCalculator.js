function calculateBadge(courseCount) {

  if (courseCount >= 10) return "Expert"
  if (courseCount >= 6) return "Advanced"
  if (courseCount >= 4) return "Skilled"
  if (courseCount >= 2) return "Beginner"

  return "Starter"

}

module.exports = calculateBadge