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

var paintColor;

function setup() {
  canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent('sketch-holder');
  capture = createCapture(VIDEO);
  capture.size(canvasWidth, canvasHeight);
  capture.hide();
  trackColor = color(255, 0, 0);
  paintColor = color(0,255,0);
  
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
  
  
  fill(paintColor)
  if(tgtX + tgtY > 0)
  {
    ellipse(tgtX, tgtY, 10, 10)
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

function keyPressed() {
  if (keyCode === BACKSPACE) 
  {
    expensiveSearch();
  }
}

function expensiveSearch(){
  var startTime = millis();
  
  //muliplied by 4 to cut down on the search space. It's still expensive.
  var previousRed = 0;
  var previousOther = 255*2;
  for(var x = 0; x < canvasWidth;x+=4)
  {
    for(var y = 0; y < canvasHeight; y+=4)
    {
      
      //let's hardcode check for red
      var redValue = red(canvas.get(x,y));
      var other = green(canvas.get(x,y))+blue(canvas.get(x,y));
      if(redValue > previousRed && other < previousOther) //higher and more red
      {
        previousRed = redValue;
        tgtX = x;
        tgtY = y;
        console.log(x+","+y+"|red:",redValue)
      } else {
        console.log(x+","+y);
      }       
    }
  }
  
  var endTime = millis();
  console.log("Search took "+(endTime-startTime)/1000+" seconds.")
}
