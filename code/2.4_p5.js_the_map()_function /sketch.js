/*
https://vimeo.com/channels/learningp5js/138331801
*/
// var col = 0;
var r = 0;
var b = 225;

function setup() {
  createCanvas(600, 400);  
}

function draw() {
  // background
  //col = mouseX;
  //col = map(mouseX, 0, 600, 0, 255);
  r = map(mouseX, 0, 600, 0, 255);
  b = map(mouseX, 0, 600, 255, 0);
  // background(col);
  background(r, 0, b);
  
  // ellipse
  fill(250, 118, 222);
  ellipse(mouseX, 200, 64, 64);
}