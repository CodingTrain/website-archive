// JavaScript Objects
// Code! Programming with p5.js
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/beginners/beginners/p5js/2.3-objects.html
// https://youtu.be/-e5h4IGKZRY
// https://editor.p5js.org/codingtrain/sketches/6J5VPMbW

// Changed object name after circle became a function in p5js.
var circle1 = {
  x: 0,
  y: 200,
  diameter: 50
};

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
  ellipse(circle1.x, circle1.y, circle1.diameter, circle1.diameter);

  circle1.x = circle1.x + 1;
}
