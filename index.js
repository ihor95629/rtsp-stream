const express = require('express');
const app = express();
const cors = require('cors'); // Import cors middleware

const { proxy, scriptUrl } = require('rtsp-relay')(app);

const handler = proxy({
  url: `rtsp://170.249.164.82:7447/4aetj08nIEMrhnQ6`,
  verbose: false,
});

// Use cors middleware
app.use(cors());

// Middleware to set cache control headers
app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  next();
});

// The endpoint our RTSP uses
app.ws('/api/stream', handler);

// This is an example HTML page to view the stream
app.get('/', (req, res) =>
  res.send(`
  <canvas id='canvas'></canvas>

  <script src='${scriptUrl}'></script>
  <script>
    loadPlayer({
      url: 'wss://' + location.host + '/api/stream',
      canvas: document.getElementById('canvas')
    });
  </script>
`),
);

app.listen(2000);
