/*
https://vimeo.com/channels/learningp5js/138327558
*/

var x = 0;
var y = 200;
var diameter = 50; 
var r = 218;
var g = 160;
var b = 221;

function setup() {
  createCanvas(600, 400);  
}

function draw() {
  // background
  background(r, g, b);
  // ellipse
  fill(250, 200, 200);
  ellipse(x, y, diameter, diameter);
  
  x = x + 1;
}