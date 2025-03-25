require('dotenv').config();
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
const port = process.env.PORT || 3001;
const upload = multer({ dest: 'uploads/' });

// Initialize Google Generative AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Middleware
app.use(cors());
app.use(express.json());

// Chat endpoint
app.post('/api/chat', upload.array('attachments'), async (req, res) => {
  try {
    const { message, mode } = req.body;
    
    // Process attachments if any
    const attachmentsInfo = req.files?.map(file => ({
      name: file.originalname,
      type: file.mimetype
    }));

    // Determine system message based on mode
    const systemMessage = mode === 'reason' 
      ? "You are an analytical assistant. Provide detailed reasoning for all responses."
      : mode === 'search'
      ? "You are a research assistant. Provide comprehensive search results."
      : "You are a helpful assistant.";

    // Get the Gemini model - using the correct model name
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-pro-latest",  // Updated model name
    });

    // Combine system message and user message
    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts: [{ text: systemMessage }],
        },
      ],
    });

    const result = await chat.sendMessage(message);
    const response = await result.response;
    const text = response.text();
    
    res.json({ 
      reply: text,
      attachments: attachmentsInfo 
    });
  } catch (error) {
    console.error('Gemini Error:', error);
    res.status(500).json({ 
      error: "Error processing your request",
      details: error.message 
    });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});