const express = require('express');
const axios = require('axios');
const cors = require('cors');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;
const API_KEY = process.env.METAPHOR_API_KEY;

app.use(cors()); // Enable CORS
app.use(express.json());

app.post('/search', async (req, res) => {
  try {
    const response = await axios.post(
      'https://api.metaphor.systems/search',
      req.body,
      {
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': API_KEY,
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/getContent', async (req, res) => {
  try {
    const response = await axios.get(
      'https://api.metaphor.systems/contents',

      {
        params: { ...req.query },
        headers: {
          accept: 'application/json',
          'x-api-key': API_KEY,
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
