// The map() Function
// Code! Programming with p5.js
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/beginners/p5js/beginners/p5js/2.4-map.html
// https://youtu.be/nicMAoW6u1g
// https://editor.p5js.org/codingtrain/sketches/yJqbGf71

var r = 0;
var b = 225;

function setup() {
  createCanvas(600, 400);
}

function draw() {
  // background
  r = map(mouseX, 0, 600, 0, 255);
  b = map(mouseX, 0, 600, 255, 0);
  background(r, 0, b);

  // ellipse
  fill(250, 118, 222);
  ellipse(mouseX, 200, 64, 64);
}
