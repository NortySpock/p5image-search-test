var capture;

var canvasWidth = 320;
var canvasHeight = 240;
var canvas;
var capture;

var trackColor; 
var threshold = 25;
var distThreshold = 50;

var tgtX = 0;
var tgtY = 0;

//var blobs = [];

var paintColor;

function setup() {
  canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent('sketch-holder');
  capture = createCapture(VIDEO);
  capture.parent('video-holder');
  capture.size(canvasWidth, canvasHeight);
  //pixelDensity(1);
  capture.hide();
  trackColor = color(255, 0, 0);
  paintColor = color(0,0,255);
  //frameRate(3);

}

function draw() {
  background(255);
  image(capture, 0, 0, canvasWidth, canvasHeight);
  capture.loadPixels()
  

  
  var count = 0;
  
  
  
 
  
  //paint crosshairs
  stroke(paintColor);
  var xhair = canvasWidth/2
  line(xhair, 0, xhair, canvasHeight);
  var yhair = canvasHeight/2
  line(0, yhair, canvasWidth, yhair);
  
  //remember you can adjust the color threshold if needed
  // if (count > 0) 
  // { 
    // tgtX = tgtX / count;
    // tgtY = tgtY / count;
    // Draw a circle at the tracked pixel
    // fill(paintColor);
    // strokeWeight(4.0);
    // stroke(0);
    // ellipse(tgtX, tgtY, 4, 4);
  // }
  
  fill(paintColor)
  if(tgtX + tgtY > 0)
  {
    ellipse(tgtX, tgtY, 3, 3)
  }
  
}

// Custom distance functions w/ no square root for optimization
function distSq(x1,   y1,   x2,   y2) {
  var d = (x2-x1)*(x2-x1) + (y2-y1)*(y2-y1);
  return d;
}


function distSq( x1,   y1,   z1,   x2,   y2,   z2) {
  var d = (x2-x1)*(x2-x1) + (y2-y1)*(y2-y1) +(z2-z1)*(z2-z1);
  return d;
}

function mousePressed() {
  var previousRed = 0;
  for(var x = 0; x < canvasWidth;x++)
  {
    for(var y = 0; y < canvasHeight; y++)
    {
      
      //let's hardcode check for red
      var redValue = red(canvas.get(x,y));
      if(redValue > previousRed) //higher
      {
        previousRed = redValue;
        tgtX = x;
        tgtY = y;
        console.log(x+","+y+"|red:",redValue)
      } else {
        console.log(x+","+y);
      }
        
      
      // currentPixel = canvas.get(x,y);
      // var r1 = red(currentPixel);
      // var g1 = green(currentPixel);
      // var b1 = blue(currentPixel);
      // var r2 = red(trackColor);
      // var g2 = green(trackColor);
      // var b2 = blue(trackColor);
      
      // var d = distSq(r1,g1,b1,r2,g2,b2);
      
      //remember you can adjust this color threshold as needed.
      // if (d < threshold*threshold) {
        // stroke(255);
        // strokeWeight(1);
        // point(x, y);
        // tgtX += x;
        // tgtY += y;
        // count++;
      // }
      
    }
  }
  
}