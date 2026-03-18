const { GoogleGenAI } = require("@google/genai")

const client = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
})

exports.generateTopicContent = async (topic) => {

  try {

    const prompt = `
You are an AI that generates structured learning content.

Topic: ${topic}

Instructions:
- Generate EXACTLY 6 steps
- Alternate strictly:
  explanation → mcq → explanation → mcq → explanation → mcq
- Keep explanations simple (3-5 lines)
- MCQ must have 4 options
- Provide correct answer EXACTLY matching one option

Return ONLY valid JSON (no extra text)

Format:
[
  {
    "type": "explanation",
    "content": "..."
  },
  {
    "type": "mcq",
    "question": "...",
    "options": ["A","B","C","D"],
    "answer": "A"
  }
]
`

    const response = await client.models.generateContent({
      model: "gemini-1.5-pro", // or gemini-3-pro if enabled in your account
      contents: prompt
    })

    let text = response.text

    // Clean markdown if present
    text = text.replace(/```json/g, "").replace(/```/g, "").trim()

    const parsed = JSON.parse(text)

    // Validate structure
    if (!Array.isArray(parsed) || parsed.length !== 6) {
      throw new Error("Invalid AI response format")
    }

    return parsed

  } catch (error) {

    console.error("Gemini Error:", error.message)

    throw new Error("Failed to generate topic content")
  }
}