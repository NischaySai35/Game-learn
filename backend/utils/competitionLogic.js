function calculateRanking(results) {

  results.sort((a, b) => b.score - a.score)

  const rankedResults = results.map((user, index) => ({
    ...user,
    rank: index + 1
  }))

  return rankedResults
}

module.exports = calculateRanking