// The random() Function (Random Points)
// Code! Programming with p5.js
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/beginners/p5js/beginners/p5js/2.4-random.html
// https://youtu.be/POn4cZ0jL-o

// Random Square Design: https://editor.p5js.org/codingtrain/sketches/Sl8ml_Lz8
// Random House Exercise: https://editor.p5js.org/codingtrain/sketches/HGq_S0Z5H
// Random Points: https://editor.p5js.org/codingtrain/sketches/h7hFqoV6H
// Painting Exercise 1: https://editor.p5js.org/codingtrain/sketches/stERy5a1D
// Painting Exercise 2: https://editor.p5js.org/codingtrain/sketches/IyyJ1QYKh

let x, y, r, g, b;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
}

function draw() {
  r = random(255);
  g = 0;
  b = random(255);
  x = random(width);
  y = random(height);
  noStroke();
  fill(r, g, b, 100);
  circle(x, y, 24);
}
