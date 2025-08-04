// Chrome Extension for AI Blog Title Generator
// This file contains the frontend logic for the extension popup

// Configuration
const SERVER_URL = 'http://localhost:3000';

// Main function to generate titles
async function generateTitle() {
  const topic = document.getElementById('topic').value.trim();
  const outputDiv = document.getElementById('output');
  const outputContainer = document.getElementById('outputContainer');
  const loading = document.getElementById('loading');
  const generateBtn = document.getElementById('generateBtn');
  
  if (!topic) {
    showError('Please enter a topic first!');
    return;
  }
  
  // Show loading state
  loading.style.display = 'block';
  outputContainer.classList.add('show');
  generateBtn.disabled = true;
  generateBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating...';

  try {
    const response = await fetch(`${SERVER_URL}/api/generate-titles`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ topic: topic })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to generate titles');
    }

    const data = await response.json();
    displayTitles(data.titles);
    
  } catch (error) {
    console.error('Error:', error);
    showError(`Error: ${error.message}`);
    // Show placeholder on error
    outputDiv.innerHTML = `
      <div class="placeholder">
        <i class="fas fa-exclamation-triangle"></i>
        <p>Failed to generate titles. Please check if the server is running.</p>
      </div>
    `;
  } finally {
    loading.style.display = 'none';
    generateBtn.disabled = false;
    generateBtn.innerHTML = '<i class="fas fa-wand-magic-sparkles"></i> Generate Titles';
  }
}

// Display generated titles
function displayTitles(titles) {
  const outputDiv = document.getElementById('output');
  
  
  const titlesHtml = titles.map((title, index) => `
    <div class="title-item" data-title="${title.replace(/"/g, '&quot;')}">
      <div class="copy-icon" title="Copy title">
        <i class="fas fa-copy"></i>
      </div>
      <span class="number">${index + 1}</span>
      ${title}
    </div>
  `).join('');
  
  outputDiv.innerHTML = titlesHtml;
  
  // Add event listeners to copy icons
  const copyIcons = outputDiv.querySelectorAll('.copy-icon');
  copyIcons.forEach(icon => {
    icon.addEventListener('click', function(e) {
      e.stopPropagation();
      const titleItem = this.closest('.title-item');
      const title = titleItem.getAttribute('data-title');
      copyToClipboard(title, this);
    });
  });
}

// Copy title to clipboard
function copyToClipboard(text, copyIcon = null) {
  navigator.clipboard.writeText(text).then(() => {
    if (copyIcon) {
      // Show success animation on the copy icon
      copyIcon.classList.add('copied');
      copyIcon.innerHTML = '<i class="fas fa-check"></i>';
      
      // Reset after animation
      setTimeout(() => {
        copyIcon.classList.remove('copied');
        copyIcon.innerHTML = '<i class="fas fa-copy"></i>';
      }, 1500);
    }
    showSuccess('Title copied to clipboard!');
  }).catch(() => {
    showError('Failed to copy to clipboard');
  });
}

// Clear all content
function clearAll() {
  document.getElementById('topic').value = '';
  document.getElementById('outputContainer').classList.remove('show');
  document.getElementById('loading').style.display = 'none';
  document.getElementById('generateBtn').disabled = false;
  document.getElementById('generateBtn').innerHTML = '<i class="fas fa-wand-magic-sparkles"></i> Generate Titles';
  
  // Reset output to placeholder
  document.getElementById('output').innerHTML = `
    <div class="placeholder">
      <i class="fas fa-arrow-up"></i>
      <p>Enter a topic and click "Generate Titles" to see your results here</p>
    </div>
  `;
}

// Show error message
function showError(message) {
  const errorDiv = document.createElement('div');
  errorDiv.className = 'error';
  errorDiv.innerHTML = `<i class="fas fa-exclamation-triangle"></i> ${message}`;
  document.querySelector('.container').appendChild(errorDiv);
  setTimeout(() => errorDiv.remove(), 5000);
}

// Show success message
function showSuccess(message) {
  const successDiv = document.createElement('div');
  successDiv.className = 'success';
  successDiv.innerHTML = `<i class="fas fa-check-circle"></i> ${message}`;
  document.querySelector('.container').appendChild(successDiv);
  setTimeout(() => successDiv.remove(), 3000);
}

// Initialize the extension
document.addEventListener('DOMContentLoaded', function() {
  // Show output container on page load
  document.getElementById('outputContainer').classList.add('show');
  
  // Add event listeners
  document.getElementById('topic').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      generateTitle();
    }
  });
  
  // Add button event listeners
  document.getElementById('generateBtn').addEventListener('click', generateTitle);
  document.getElementById('clearBtn').addEventListener('click', clearAll);
  
  // Check server status on load
  checkServerStatus();
});

// Check if the server is running
async function checkServerStatus() {
  try {
    const response = await fetch(`${SERVER_URL}/health`);
    if (!response.ok) {
      showError('Server is not responding. Please start the server first.');
    }
  } catch (error) {
    showError('Cannot connect to server. Please make sure the server is running on localhost:3000');
  }
} 