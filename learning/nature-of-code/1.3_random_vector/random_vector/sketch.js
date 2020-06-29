// A Random Vector
// The Nature of Code
// The Coding Train / Daniel Shiffman
// https://youtu.be/jupjuq9Jl-M
// https://thecodingtrain.com/learning/nature-of-code/1.3-random-vector.html

// Random Vector: https://editor.p5js.org/codingtrain/sketches/qHKMdpRR
// Walker: https://editor.p5js.org/codingtrain/sketches/_HHLfcGx

function setup() {
  createCanvas(400, 400);
  background(0);
}

function draw() {
  translate(width / 2, height / 2);

  // let v = createVector(random(-100, 100), random(-100, 100));
  v = p5.Vector.random2D();
  v.mult(random(50, 100));

  strokeWeight(4);
  stroke(255, 50);
  line(0, 0, v.x, v.y);
}
