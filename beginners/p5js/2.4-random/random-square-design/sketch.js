// The random() Function (Random Square Design)
// Code! Programming with p5.js
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/beginners/p5js/beginners/p5js/2.4-random.html
// https://youtu.be/POn4cZ0jL-o

// Random Square Design: https://editor.p5js.org/codingtrain/sketches/Sl8ml_Lz8
// Random House Exercise: https://editor.p5js.org/codingtrain/sketches/HGq_S0Z5H
// Random Points: https://editor.p5js.org/codingtrain/sketches/h7hFqoV6H
// Painting Exercise 1: https://editor.p5js.org/codingtrain/sketches/stERy5a1D
// Painting Exercise 2: https://editor.p5js.org/codingtrain/sketches/IyyJ1QYKh

let squareSize;
let lineWidth;

function setup() {
  createCanvas(400, 300);
  background(100);
}

function draw() {
  lineWidth = random(4, 28);
  squareSize = random(5, 250);

  rectMode(CENTER);
  strokeWeight(lineWidth);
  stroke(0, 0, 255, 10);
  fill(0, 255, 0, 10);
  square(200, 150, squareSize);
}
