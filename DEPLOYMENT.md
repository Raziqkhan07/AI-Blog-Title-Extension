# 🚀 Deployment Guide - AI Blog Title Generator Extension

This guide will help you deploy the backend server so your Chrome extension works without running a local server.

## 📋 Prerequisites

- GitHub account
- OpenAI API key
- One of the following cloud platforms (all have free tiers):
  - Vercel (Recommended)
  - Heroku
  - Railway
  - Render

## 🎯 Option 1: Deploy to Vercel (Recommended)

### Step 1: Prepare Your Code

1. **Create a GitHub repository** and push your code:
   ```bash
   cd ai-blog-title-extension
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/Raziqkhan07/AI-Blog-Title-Extension.git
   git push -u origin main
   ```

### Step 2: Deploy to Vercel

1. **Go to [Vercel](https://vercel.com)** and sign up with GitHub
2. **Click "New Project"**
3. **Import your GitHub repository**
4. **Configure the project:**
   - Framework Preset: `Node.js`
   - Root Directory: `server`
   - Build Command: `npm run build`
   - Output Directory: `(leave empty)`
   - Install Command: `npm install`

5. **Add Environment Variables:**
   - Go to Project Settings → Environment Variables
   - Add: `OPENAI_API_KEY` = `your_openai_api_key_here`

6. **Deploy!** Click "Deploy"

### Step 3: Update Extension

1. **Get your Vercel URL** (e.g., `https://your-project.vercel.app`)
2. **Update `popup.js`:**
   ```javascript
   const SERVER_URL = 'https://your-project.vercel.app';
   ```
3. **Update `manifest.json`:**
   ```json
   "host_permissions": [
     "https://your-project.vercel.app/*"
   ]
   ```

## 🎯 Option 2: Deploy to Heroku

### Step 1: Prepare for Heroku

1. **Create `Procfile` in server folder:**
   ```
   web: node server.js
   ```

2. **Update `package.json` engines:**
   ```json
   "engines": {
     "node": "18.x"
   }
   ```

### Step 2: Deploy to Heroku

1. **Install Heroku CLI** and login
2. **Create Heroku app:**
   ```bash
   cd server
   heroku create your-app-name
   ```

3. **Set environment variable:**
   ```bash
   heroku config:set OPENAI_API_KEY=your_openai_api_key_here
   ```

4. **Deploy:**
   ```bash
   git add .
   git commit -m "Deploy to Heroku"
   git push heroku main
   ```

5. **Update extension** with your Heroku URL

## 🎯 Option 3: Deploy to Railway

### Step 1: Deploy to Railway

1. **Go to [Railway](https://railway.app)** and sign up with GitHub
2. **Create new project** from GitHub repo
3. **Set environment variable:**
   - `OPENAI_API_KEY` = `your_openai_api_key_here`
4. **Deploy automatically**

### Step 2: Update Extension

Use the Railway-provided URL to update your extension.

## 🎯 Option 4: Deploy to Render

### Step 1: Deploy to Render

1. **Go to [Render](https://render.com)** and sign up
2. **Create new Web Service**
3. **Connect your GitHub repo**
4. **Configure:**
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Environment: `Node`
5. **Add environment variable:**
   - `OPENAI_API_KEY` = `your_openai_api_key_here`

## 🔧 Testing Your Deployment

### 1. Test the API Endpoints

Visit your deployed URL:
- **Health check:** `https://your-url.com/health`
- **Should return:** `{"status":"OK","timestamp":"..."}`

### 2. Test Title Generation

Use curl or Postman:
```bash
curl -X POST https://your-url.com/api/generate-titles \
  -H "Content-Type: application/json" \
  -d '{"topic":"test"}'
```

## 🔒 Security Considerations

### 1. Environment Variables
- **Never commit API keys** to your repository
- **Use environment variables** in your cloud platform
- **Keep your API key secure**

### 2. CORS Configuration
The server is already configured to allow requests from Chrome extensions.

### 3. Rate Limiting
Consider adding rate limiting for production use.

## 📱 Update Your Extension

### 1. Update Server URL

In `extension/popup.js`:
```javascript
const SERVER_URL = 'https://your-deployed-url.com';
```

### 2. Update Manifest Permissions

In `manifest.json`:
```json
"host_permissions": [
  "https://your-deployed-url.com/*"
]
```

### 3. Reload Extension

1. Go to `chrome://extensions/`
2. Click the refresh icon on your extension
3. Test the extension

## 🚀 Production Checklist

- [ ] Backend deployed and accessible
- [ ] Environment variables set
- [ ] API endpoints tested
- [ ] Extension updated with new URL
- [ ] Extension tested and working
- [ ] Ready for Chrome Web Store (optional)

## 🆘 Troubleshooting

### Common Issues:

1. **CORS Errors:**
   - Ensure your deployed URL is in `host_permissions`
   - Check that CORS is properly configured

2. **API Key Issues:**
   - Verify environment variable is set correctly
   - Check API key has sufficient credits

3. **Deployment Failures:**
   - Check build logs in your cloud platform
   - Ensure all dependencies are in `package.json`

## 🎉 Success!

Once deployed, your extension will work without needing a local server running. Users can install it and use it immediately!

---

**Need help?** Check the platform-specific documentation or create an issue in your repository. 