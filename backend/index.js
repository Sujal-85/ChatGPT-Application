require('dotenv').config();
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 3001;
const upload = multer({ dest: 'uploads/' });

// Middleware
const corsOptions = {
  origin: 'https://chatgpt-app-rho-ten.vercel.app', // Replace with actual frontend domain
  methods: ['GET', 'POST'],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

// Chat endpoint
app.get('/', (req, res) => {
  res.send('Backend is working!');
});


app.post('/api/chat', upload.array('attachments'), async (req, res) => {
  try {
    const { message, mode } = req.body;

    // Process attachments if any
    const attachmentsInfo = req.files?.map(file => ({
      name: file.originalname,
      type: file.mimetype,
    }));

    // Determine system message based on mode
    const systemMessage = mode === 'reason'
      ? 'You are an analytical assistant. Provide detailed reasoning for all responses.'
      : mode === 'search'
      ? 'You are a research assistant. Provide comprehensive search results.'
      : 'You are a helpful assistant.';

    // Verify API key is loaded
    if (!process.env.OPENROUTER_API_KEY) {
      throw new Error('OPENROUTER_API_KEY is not set in environment variables.');
    }

    // Prepare OpenRouter API request
    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: 'meta-llama/llama-3.1-8b-instruct', // Free-tier compatible model
        messages: [
          { role: 'system', content: systemMessage },
          { role: 'user', content: message },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    // Extract the response text
    const reply = response.data.choices[0].message.content;

    res.json({
      reply,
      attachments: attachmentsInfo,
    });
  } catch (error) {
    console.error('OpenRouter Error:', error);
    if (error.response?.status === 402) {
      res.status(402).json({
        error: 'Payment required. Please add credits or a payment method to your OpenRouter account.',
        details: error.response?.data?.error?.message || error.message,
      });
    } else if (error.response?.status === 401) {
      res.status(401).json({
        error: 'Invalid API key. Please verify or regenerate your OpenRouter API key.',
        details: error.response?.data?.error?.message || error.message,
      });
    } else {
      res.status(500).json({
        error: 'Error processing your request',
        details: error.message,
      });
    }
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
