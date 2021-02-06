// Polar Coordinates (Spiral)
// The Nature of Code
// The Coding Train / Daniel Shiffman
// https://youtu.be/O5wjXoFrau4
// https://thecodingtrain.com/learning/nature-of-code/3.4-polar-coordinates.html

// Basic Polar Coordinates: https://editor.p5js.org/codingtrain/sketches/DHetsOfgz
// Spiral: https://editor.p5js.org/codingtrain/sketches/BnJ_4U4cr
// Random Trail: https://editor.p5js.org/codingtrain/sketches/WqK-qD1vU
// Circular Shape: https://editor.p5js.org/codingtrain/sketches/s10TQXDZv

let angle = 0;
let r = 150;

function setup() {
  createCanvas(400, 400);
  background(0);
}

function draw() {
  // stroke(255);
  // strokeWeight(4);
  // noFill();
  // circle(0, 0, r * 2);

  translate(200, 200);
  strokeWeight(16);
  stroke(252, 238, 33);
  let x = r * cos(angle);
  let y = r * sin(angle);
  point(x, y);

  angle += 0.04;
  r -= 0.2;
}
