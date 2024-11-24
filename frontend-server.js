const express = require('express');
const path = require('path');

const app = express();
const PORT = 80;

// Serve static files from the "build" directory
app.use(express.static(path.join(__dirname, 'build')));

// Fallback to index.html for any unmatched route (React's SPA routing)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});