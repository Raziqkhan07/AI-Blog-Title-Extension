const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// OpenAI API configuration
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

if (!OPENAI_API_KEY) {
  console.error('❌ OPENAI_API_KEY not found in environment variables');
  console.error('Please create a .env file with your OpenAI API key');
  process.exit(1);
}

// API endpoint for generating titles
app.post('/api/generate-titles', async (req, res) => {
  try {
    const { topic } = req.body;
    
    if (!topic || !topic.trim()) {
      return res.status(400).json({ error: 'Topic is required' });
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'user',
            content: `Generate 5 engaging and SEO-friendly blog titles about "${topic}". 
            Make them catchy, click-worthy, and varied in style. 
            Return only the titles, one per line, without numbering.`
          }
        ],
        temperature: 0.8,
        max_tokens: 300
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('OpenAI API Error:', errorData);
      return res.status(response.status).json({ 
        error: errorData.error?.message || 'Failed to generate titles' 
      });
    }

    const data = await response.json();
    const content = data.choices[0].message.content;
    
    // Parse the titles from the response
    const titles = content
      .split('\n')
      .map(title => title.trim())
      .filter(title => title.length > 0)
      .slice(0, 5); // Ensure we only get 5 titles

    res.json({ titles });
  } catch (error) {
    console.error('Server Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📝 AI Blog Title Generator Extension Server is ready!`);
  console.log(`🔑 Using API key from .env file`);
}); 