// Nested Loops
// Code! Programming with p5.js
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/beginners/p5js/4.2-nested-loops.html
// https://youtu.be/1c1_TMdf8b8
// https://editor.p5js.org/codingtrain/sketches/nxJTfiJd

function setup() {
  createCanvas(600, 400);
}

function draw() {
  background(0);
  strokeWeight(4);
  stroke(255);

  for (var x = 0; x <= width; x += 50) {
    for (var y = 0; y <= height; y += 50) {
      fill(random(255), 0, random(255));
      ellipse(x, y, 25, 25);
    }
  }
}
