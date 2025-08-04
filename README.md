# AI Blog Title Generator - Chrome Extension 🚀

A Chrome extension that generates AI-powered blog titles using your own secure backend server. Transform your ideas into compelling, SEO-friendly blog titles with just a few clicks!

## ✨ Features

- **🎨 Beautiful UI**: Modern, responsive design with smooth animations
- **🤖 AI-Powered**: Uses OpenAI's GPT-4 to generate engaging titles
- **🔒 Secure**: Backend proxy keeps your API keys safe
- **📋 Copy to Clipboard**: One-click copying of generated titles
- **⚡ Fast**: Optimized for quick title generation
- **🎯 SEO-Friendly**: Generates titles optimized for search engines

## 📁 Project Structure

```
ai-blog-title-extension/
├── extension/
│   ├── manifest.json      # Extension configuration
│   ├── popup.html         # Extension popup UI
│   ├── popup.js           # Frontend JavaScript logic
│   ├── styles.css         # Styling for the popup
│   └── icon.svg           # Extension icon
├── server/
│   ├── server.js          # Backend server
│   ├── package.json       # Server dependencies
│   └── README.md          # Server documentation
└── README.md              # This file
```

## 🚀 Quick Start

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn
- OpenAI API key
- Google Chrome browser

### Step 1: Set up the Backend Server

1. **Navigate to the server directory**
   ```bash
   cd ai-blog-title-extension/server
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create environment file**
   
   Create a `.env` file in the server directory:
   ```env
   OPENAI_API_KEY=your_openai_api_key_here
   PORT=3000
   ```

4. **Start the server**
   ```bash
   npm start
   ```

5. **Verify server is running**
   
   Open `http://localhost:3000/health` in your browser. You should see:
   ```json
   {"status":"OK","timestamp":"..."}
   ```

### Step 2: Install the Chrome Extension

1. **Open Chrome Extensions**
   
   Navigate to `chrome://extensions/` in your browser

2. **Enable Developer Mode**
   
   Toggle the "Developer mode" switch in the top right

3. **Load the Extension**
   
   Click "Load unpacked" and select the `ai-blog-title-extension` folder

4. **Verify Installation**
   
   You should see the "AI Blog Title Generator" extension in your extensions list

### Step 3: Use the Extension

1. **Click the extension icon** in your Chrome toolbar
2. **Enter a topic** in the input field
3. **Click "Generate Titles"** or press Enter
4. **Click on any title** to copy it to your clipboard

## 🔧 Development

### Backend Development

```bash
cd server
npm run dev  # Starts with nodemon for auto-restart
```

### Frontend Development

The extension files are in the `extension/` folder:
- `popup.html` - Main UI
- `popup.js` - JavaScript logic
- `styles.css` - Styling
- `manifest.json` - Extension configuration

### Making Changes

1. **Edit the files** in the `extension/` folder
2. **Reload the extension** in `chrome://extensions/`
3. **Test your changes** by clicking the extension icon

## 🔒 Security

- **API Key Protection**: Your OpenAI API key is stored securely in the backend
- **CORS Configuration**: Server allows requests only from the extension
- **Input Validation**: All inputs are validated and sanitized
- **No Client-Side Secrets**: API keys never leave the server

## 🎯 API Endpoints

The extension communicates with these server endpoints:

- `POST /api/generate-titles` - Generate blog titles
- `GET /health` - Health check

## 🚀 Deployment

### Local Development
- Server runs on `localhost:3000`
- Extension loads from local files

### Production Deployment

For production use, consider:

1. **Deploy the server** to a cloud service (Heroku, Vercel, etc.)
2. **Update the server URL** in `popup.js`:
   ```javascript
   const SERVER_URL = 'https://your-deployed-server.com';
   ```
3. **Update host permissions** in `manifest.json`:
   ```json
   "host_permissions": ["https://your-deployed-server.com/*"]
   ```
4. **Publish to Chrome Web Store** (optional)

## 🐛 Troubleshooting

### Extension Not Working

1. **Check if server is running**
   - Visit `http://localhost:3000/health`
   - Should return `{"status":"OK"}`

2. **Check extension permissions**
   - Go to `chrome://extensions/`
   - Ensure the extension is enabled
   - Check for any error messages

3. **Check browser console**
   - Right-click extension popup → Inspect
   - Look for error messages in Console tab

### Server Issues

1. **API Key Error**
   - Ensure `.env` file exists in server folder
   - Verify API key is valid and has credits

2. **Port Already in Use**
   - Change PORT in `.env` file
   - Update `popup.js` SERVER_URL accordingly

## 📝 Usage Examples

### Example Topics to Try

- "healthy cooking"
- "web development"
- "travel tips"
- "digital marketing"
- "personal finance"
- "fitness motivation"

### Generated Title Examples

For "healthy cooking":
1. "10 Quick and Healthy Dinner Recipes for Busy Weeknights"
2. "The Ultimate Guide to Meal Prep: Save Time and Eat Better"
3. "Healthy Cooking Hacks That Will Transform Your Kitchen"
4. "From Beginner to Chef: Master Healthy Cooking in 30 Days"
5. "Why Healthy Cooking is the Key to a Better Lifestyle"

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- OpenAI for providing the GPT-4 API
- Font Awesome for the beautiful icons
- Inter font family for typography

---

**Made with ❤️ and ☕** 
"# AI-Blog-Title-Extension" 
