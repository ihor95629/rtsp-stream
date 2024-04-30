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

// The endpoint our RTSP uses
app.ws('/api/stream', handler);

// This is an example HTML page to view the stream
app.get('/', (req, res) =>
  res.send(`
  <style>
    html, body, #canvas {
      margin: 0;
      padding: 0;
      width: 100%;
      height: 100%;
      overflow: hidden;
    }
  </style>
  <canvas id='canvas'></canvas>

  <script src='${scriptUrl}'></script>
  <script>
    // Adjust canvas size to fit browser window
    function resizeCanvas() {
      const canvas = document.getElementById('canvas');
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    
    // Call resizeCanvas function when the window is resized
    window.addEventListener('resize', resizeCanvas);
    
    // Initially set canvas size
    resizeCanvas();

    loadPlayer({
      url: 'ws://' + location.host + '/api/stream',
      canvas: document.getElementById('canvas')
    });
  </script>
`),
);

app.listen(2000);
