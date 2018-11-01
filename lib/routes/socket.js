const cv = require('opencv4nodejs');

const { drawRect, convertToRGBA } = require('../utils');

// Camera properties.
const camWidth = 320;
const camHeight = 240;
const camInterval = 100;

// Initialize camera.
const camera = new cv.VideoCapture(0);
camera.set(cv.CAP_PROP_FRAME_WIDTH, camWidth)
camera.set(cv.CAP_PROP_FRAME_HEIGHT, camHeight)

// Front face classifier.
const classifier = new cv.CascadeClassifier(cv.HAAR_FRONTALFACE_ALT2);

module.exports = function (socket) {
  setInterval(async function() {
    try {
      const frame = await camera.readAsync();
      const frameGray = await frame.bgrToGray();
      const res = await classifier.detectMultiScaleAsync(frameGray);
      
      // Draw rectangle for each identified face.
      res.objects.forEach(rect => drawRect(frame, rect));

      const frameRGBA = convertToRGBA(frame);

      // Send raw data to client.
      socket.emit('frame', { 
        buffer: frameRGBA.getData(),
        cols: frame.cols,
        rows: frame.rows 
      });
    } catch (err) {
      console.log(err);
    }
  }, camInterval);
};
