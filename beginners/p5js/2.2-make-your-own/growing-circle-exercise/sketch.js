// Make Your Own (Growing Circle Exercise)
// Code! Programming with p5.js
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/beginners/p5js/2.2-make-your-own.html
// https://youtu.be/dRhXIIFp-ys

// Make Your Own Variable: https://editor.p5js.org/codingtrain/sketches/xPXNdPy17
// Growing Circle Exercise: https://editor.p5js.org/codingtrain/sketches/ehbMJ-otC

let circleR = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function mousePressed() {
  circleR = 0;
}

function draw() {
  background(0);
  noStroke();
  fill(255);
  circle(width / 2, height / 2, circleR * 2);
  circleR = circleR + 1;
}
