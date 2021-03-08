// Make Your Own (Make Your Own Variable)
// Code! Programming with p5.js
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/beginners/p5js/2.2-make-your-own.html
// https://youtu.be/dRhXIIFp-ys

// Make Your Own Variable: https://editor.p5js.org/codingtrain/sketches/xPXNdPy17
// Growing Circle Exercise: https://editor.p5js.org/codingtrain/sketches/ehbMJ-otC

let circleX = 100;

function setup() {
  createCanvas(400, 300);
}

function mousePressed() {
  circleX = 0;
}

function draw() {
  background(0);
  noStroke();
  fill(255);
  circle(circleX, 150, 64);
  circleX = circleX + 1;
}
