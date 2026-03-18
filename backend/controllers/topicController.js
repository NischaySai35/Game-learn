const Progress = require("../models/Progress")
const { generateTopicContent } = require("../services/contentService")

exports.startTopic = async (req, res) => {

  const { topic } = req.body
  const userId = req.user.id

  try {

    const content = await generateTopicContent(topic)

    const progress = await Progress.create({
      userId,
      topicId: topic,
      currentStep: 0
    })

    res.json({
      content,
      progressId: progress._id
    })

  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

exports.getStep = async (req, res) => {

  const { progressId } = req.params

  const progress = await Progress.findById(progressId)

  res.json({
    currentStep: progress.currentStep
  })
}

exports.submitAnswer = async (req, res) => {

  const { progressId, step, selected, correctAnswer } = req.body

  const progress = await Progress.findById(progressId)

  const isCorrect = selected === correctAnswer

  progress.answers.push({
    step,
    selected,
    correct: isCorrect
  })

  if (isCorrect) {
    // reward logic
  }

  progress.currentStep += 1

  await progress.save()

  res.json({
    correct: isCorrect,
    nextStep: progress.currentStep
  })
}

exports.nextStep = async (req, res) => {

  const { progressId } = req.body

  const progress = await Progress.findById(progressId)

  progress.currentStep += 1

  await progress.save()

  res.json({ nextStep: progress.currentStep })
}

exports.completeTopic = async (req, res) => {

  const { progressId } = req.body

  const progress = await Progress.findById(progressId)

  progress.isCompleted = true

  await progress.save()

  res.json({ message: "Topic completed 🎉" })
}