// The random() Function (Painting Exercise 2)
// Code! Programming with p5.js
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/beginners/p5js/beginners/p5js/2.4-random.html
// https://youtu.be/POn4cZ0jL-o

// Random Square Design: https://editor.p5js.org/codingtrain/sketches/Sl8ml_Lz8
// Random House Exercise: https://editor.p5js.org/codingtrain/sketches/HGq_S0Z5H
// Random Points: https://editor.p5js.org/codingtrain/sketches/h7hFqoV6H
// Painting Exercise 1: https://editor.p5js.org/codingtrain/sketches/stERy5a1D
// Painting Exercise 2: https://editor.p5js.org/codingtrain/sketches/IyyJ1QYKh

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
}

function draw() {
  noStroke();
  fill(random(50, 255), random(50, 150), random(50, 255), 100);
  circle(mouseX, mouseY, random(24, 64));
}

function mousePressed() {
  background(0);
}
