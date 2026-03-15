function validateQuizSubmission(req, res, next) {

  const { userId, answers } = req.body

  if (!userId || !answers) {
    return res.status(400).json({ message: "Invalid request" })
  }

  next()

}

module.exports = validateQuizSubmission