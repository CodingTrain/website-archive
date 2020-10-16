// Variables in p5.js (Make Your Own)
// Code! Programming with p5.js
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/beginners/p5js/2.2-make-your-own.html
// https://youtu.be/Bn_B3T_Vbxs
// https://editor.p5js.org/codingtrain/sketches/n8Og60lq

var circleX = 0;

function setup() {
  createCanvas(600, 400);
}

function draw() {
  // background
  background(250, 250, 100);
  // ellipse
  fill(250, 200, 200);
  ellipse(circleX, 200, 80, 80);

  circleX = circleX + 10;
}
