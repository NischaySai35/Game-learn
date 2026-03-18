// services/projectService.js

const { GoogleGenAI } = require("@google/genai")

const client = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
})

exports.evaluateProject = async (githubLink, deploymentLink) => {

  try {

    const prompt = `
You are an expert software reviewer AI.

Evaluate this project:

GitHub Repo: ${githubLink}
Live URL: ${deploymentLink}

Analyze:
- Code quality
- Functionality
- UI/UX
- Performance

Return ONLY JSON:

{
  "score": number (0-100)
  }
}
`

    const response = await client.models.generateContent({
      model: "gemini-1.5-pro",
      contents: prompt
    })

    let text = response.text

    // Clean markdown
    text = text.replace(/```json/g, "").replace(/```/g, "").trim()

    return JSON.parse(text)

  } catch (error) {

    console.error("AI Project Evaluation Error:", error.message)
    throw new Error("Project evaluation failed")
  }
}