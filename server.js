const express = require('express');
const fetch = require('node-fetch');
const app = express();

app.get('/proxy', async (req, res) => {
  try {
    // Fetch the webpage with the desired User-Agent header
    const response = await fetch('https://59e8-185-65-205-130.ngrok-free.app/', {
      headers: {
        'ngrok-skip-browser-warning': 'any'
      }
    });

    // Send the fetched content as the response
    res.send(await response.text());
  } catch (error) {
    console.error('Error fetching webpage:', error);
    res.status(500).send('Error fetching webpage');
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
