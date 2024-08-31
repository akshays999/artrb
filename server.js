const express = require("express");
const axios = require("axios");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(express.static("public"));

const PORT = process.env.PORT || 3000;
const CHATGPT_API_KEY = process.env.CHATGPT_API_KEY;

app.post("/generate-path", async (req, res) => {
  const { topic, currentKnowledge, learningGoals } = req.body;

  try {
    const prompt = `
            You are an AI that generates personalized learning paths.
            Topic: ${topic}
            Current Knowledge: ${currentKnowledge}
            Learning Goals: ${learningGoals}
            Please provide a step-by-step learning plan, including recommended resources, topics to cover, and a suggested timeline.
        `;

    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4",
        messages: [{ role: "user", content: prompt }],
      },
      {
        headers: {
          Authorization: `Bearer ${CHATGPT_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const learningPath = response.data.choices[0].message.content;
    res.json({ learningPath });
  } catch (error) {
    console.error("Error generating learning path:", error);
    res.status(500).json({ error: "Failed to generate learning path" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
