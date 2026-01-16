const { GoogleGenAI  } = require('@google/genai');
require('dotenv').config()

const geminiKey = process.env.GEMINI_API_KEY

const client = new GoogleGenAI({ apiKey: geminiKey });

module.exports = { geminiClient: client }