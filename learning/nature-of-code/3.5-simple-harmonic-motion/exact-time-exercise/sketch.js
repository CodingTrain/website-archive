// Simple Harmonic Motion (Exact Time Exercise)
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
let angleV = 0;

let saveTime = 0;
let period = 1000;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0);
  translate(width / 2, height / 3);
  fill(252, 238, 33);

  angle = (TWO_PI * (millis() % period)) / period;

  let r = map(sin(angle), -1, 1, 0, height / 3);
  circle(0, 0, r * 2);

  fill(255);
  textFont("Courier");
  textSize(64);
  textAlign(CENTER, CENTER);
  let seconds = floor(millis() / 1000);
  let sec = floor(seconds % 60);
  let min = floor(seconds / 60);

  text(`${nf(min, 2)}:${nf(sec, 2)}`, 0, height / 2);
}
