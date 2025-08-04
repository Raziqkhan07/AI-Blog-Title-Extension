# AI Blog Title Generator Extension - Server

Backend server for the AI Blog Title Generator Chrome Extension.

## 🚀 Quick Start

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn
- OpenAI API key

### Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Set up environment variables**
   
   Create a `.env` file in the server directory and add your OpenAI API key:
   ```env
   OPENAI_API_KEY=your_openai_api_key_here
   PORT=3000
   ```

3. **Start the server**
   ```bash
   npm start
   ```

4. **Verify the server is running**
   
   Navigate to `http://localhost:3000/health` to check if the server is running.

## 🔧 Development

### Running in Development Mode
```bash
npm run dev
```

This will start the server with nodemon for automatic restarts on file changes.

## 🎯 API Endpoints

- `POST /api/generate-titles` - Generate blog titles
- `GET /health` - Health check endpoint

## 🔒 Security

- API keys are stored securely in environment variables
- CORS enabled for cross-origin requests from the Chrome extension
- Input validation and sanitization

## 📝 Usage with Chrome Extension

The Chrome extension will make requests to this server at `http://localhost:3000`. Make sure the server is running before using the extension.

## 🚀 Deployment

For production deployment, consider:
- Using a cloud service (Heroku, Vercel, etc.)
- Setting up proper CORS for your domain
- Using environment variables for configuration 