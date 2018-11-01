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



  // // Reference: http://stackoverflow.com/questions/24107378/socket-io-began-to-support-binary-stream-from-1-0-is-there-a-complete-example-e/24124966#24124966
  // var uint8Arr = new Uint8Array(data.buffer);
  // var b64encoded = bufferToBase64(uint8Arr);
  // console.log(b64encoded);
  // myImg.src = 'data:image/png;base64,' + b64encoded;




  // var str = String.fromCharCode.apply(null, uint8Arr);
  // var base64String = btoa(str);

  // img.onload = function () {
  //   context.drawImage(this, 0, 0, canvas.width, canvas.height);
  // };
  // img.src = 'data:image/png;base64,' + base64String;
});