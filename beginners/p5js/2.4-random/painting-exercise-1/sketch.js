// The random() Function (Painting Exercise 1)
// Code! Programming with p5.js
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/beginners/p5js/beginners/p5js/2.4-random.html
// https://youtu.be/POn4cZ0jL-o

// Random Square Design: https://editor.p5js.org/codingtrain/sketches/Sl8ml_Lz8
// Random House Exercise: https://editor.p5js.org/codingtrain/sketches/HGq_S0Z5H
// Random Points: https://editor.p5js.org/codingtrain/sketches/h7hFqoV6H
// Painting Exercise 1: https://editor.p5js.org/codingtrain/sketches/stERy5a1D
// Painting Exercise 2: https://editor.p5js.org/codingtrain/sketches/IyyJ1QYKh

let r = 255;
let g = 255;
let b = 255;
let diameter = 32;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
}

function draw() {
  noStroke();
  fill(r, g, b, 100);
  circle(mouseX, mouseY, diameter);
}

function mousePressed() {
  // background(0);
  r = random(100, 255);
  g = random(100, 255);
  b = random(100, 255);
  diameter = random(16, 64);
}
