function calculateBadge(courseCount) {

  if (courseCount >= 8) return "Expert"
  if (courseCount >= 5) return "Advanced"
  if (courseCount >= 3) return "Skilled"
  if (courseCount >= 1) return "Beginner"

  return "Newbie"

}

module.exports = calculateBadge