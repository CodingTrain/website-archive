// Angles and Rotation
// The Nature of Code
// The Coding Train / Daniel Shiffman
// https://youtu.be/DMg-WRfNB60
// https://thecodingtrain.com/learning/nature-of-code/3.1-angles-rotation.html
// https://editor.p5js.org/codingtrain/sketches/y7ieDesyd

let angle = 0;

function setup() {
  createCanvas(400, 400);
  angleMode(RADIANS);
}

function draw() {
  background(146, 83, 161);
  noStroke();
  fill(240, 99, 164);
  rectMode(CENTER);
  translate(200, 200);
  rotate(angle);
  rect(0, 0, 128, 64);

  angle += 0.05;
}
