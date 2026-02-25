const { GoogleGenAI } = require('@google/genai');
require('dotenv').config();

const geminiKey = process.env.GEMINI_API_KEY;
const geminiClient = new GoogleGenAI({ apiKey: geminiKey });

async function generateGeminiResponse(systemPrompt, userText) {
  const response = await geminiClient.models.generateContent({
    model: 'gemini-2.5-flash-lite',
    contents: `${systemPrompt}\n\nUsuario: ${userText}`,
  });

  return response.text || '';
}

module.exports = { generateGeminiResponse };
