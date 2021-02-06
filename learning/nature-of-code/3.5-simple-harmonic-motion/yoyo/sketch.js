// Simple Harmonic Motion (Yoyo)
// The Nature of Code
// The Coding Train / Daniel Shiffman
// https://youtu.be/oXwCVDXS2Lg
// https://thecodingtrain.com/learning/nature-of-code/3.3-angles-and-vectors.html

// Basic: https://editor.p5js.org/codingtrain/sketches/Fn1feR81W
// Approximate Time: https://editor.p5js.org/codingtrain/sketches/uGCYH4-PN
// Exact Time Exercise: https://editor.p5js.org/codingtrain/sketches/jp2B-0Wkg
// Main: https://editor.p5js.org/codingtrain/sketches/MfvyVULHT
// Yoyo: https://editor.p5js.org/codingtrain/sketches/qBhVjZ0pn
// 2-axes Exercise: https://editor.p5js.org/codingtrain/sketches/_ir7-suNG

let angle = 0;
let angleV = 0.05;

function setup() {
  createCanvas(600, 400);
}

function draw() {
  background(0);
  translate(300, 200);
  fill(252, 238, 33);
  stroke(252, 238, 33);
  let y = map(sin(angle), -1, 1, -200, 200);
  strokeWeight(4);
  line(0, 0, 0, y);
  circle(0, y, 32);
  angle += angleV;
}
