var capture;

var canvasWidth = 320;
var canvasHeight = 240;
var canvas;
var capture;

function setup() {
  canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent('sketch-holder');
  capture = createCapture(VIDEO);
  capture.parent('video-holder');
  capture.size(canvasWidth, canvasHeight);
  //capture.hide();
}

function draw() {
  background(255);
  image(capture, 0, 0, canvasWidth, canvasHeight);
}
