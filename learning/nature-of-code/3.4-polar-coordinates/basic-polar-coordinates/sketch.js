// Polar Coordinates (Basic Polar Coordinates)
// The Nature of Code
// The Coding Train / Daniel Shiffman
// https://youtu.be/O5wjXoFrau4
// https://thecodingtrain.com/learning/nature-of-code/3.4-polar-coordinates.html

// Basic Polar Coordinates: https://editor.p5js.org/codingtrain/sketches/DHetsOfgz
// Spiral: https://editor.p5js.org/codingtrain/sketches/BnJ_4U4cr
// Random Trail: https://editor.p5js.org/codingtrain/sketches/WqK-qD1vU
// Circular Shape: https://editor.p5js.org/codingtrain/sketches/s10TQXDZv

let angle = 0;

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(0);
  stroke(255);
  strokeWeight(4);
  noFill();
  translate(200, 200);
  let r = 150;
  circle(0, 0, r * 2);

  strokeWeight(32);
  stroke(252, 238, 33);
  let x = r * cos(angle);
  let y = r * sin(angle);
  point(x, y);

  angle += 0.01;
}
