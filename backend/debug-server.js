const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
const port = 3001;


// API endpoint to fetch weight
app.get('/api/weight', async (req, res) => {
  try {
    const raw = Math.floor(Math.random() * 50000);
    res.json({ raw });
  } catch (error) {
    res.status(500).json({ error: 'Error reading data from HX711' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`HX711 server running on http://localhost:${port}`);
});