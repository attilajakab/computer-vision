// MODIFY THIS TO THE APPROPRIATE URL IF IT IS NOT BEING RUN LOCALLY
var socket = io.connect('http://localhost:8080');

var myImg = document.getElementById('my-img');
var canvas = document.getElementById('canvas-video');
var context = canvas.getContext('2d');
var img = new Image();

// show loading notice
context.fillStyle = '#333';
context.fillText('Loading...', canvas.width/2-30, canvas.height/3);

socket.on('frame', function (data) {
  const imgData = new ImageData(
    new Uint8ClampedArray(data.buffer),
    data.cols,
    data.rows
  );

  canvas.height = data.rows;
  canvas.width = data.cols;
  context.putImageData(imgData, 0, 0);
});
