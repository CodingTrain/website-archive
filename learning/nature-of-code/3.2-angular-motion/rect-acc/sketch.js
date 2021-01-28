// Angular Motion (Rectangle Acceleration)
// The Nature of Code
// The Coding Train / Daniel Shiffman
// https://youtu.be/i2ROE_mAhU0
// https://thecodingtrain.com/learning/nature-of-code/3.2-angular-motion.html

// Rectangle Acceleration: https://editor.p5js.org/codingtrain/sketches/RR9XUN1mf
// Rectangle Grab Exercise: https://editor.p5js.org/codingtrain/sketches/In9e8j6t_
// Gravitational Attraction: https://editor.p5js.org/codingtrain/sketches/Y-yxvkkZk

let angle = 0;
let angleV = 0;
let angleA = 0.001;

function setup() {
  createCanvas(400, 400);
  angleMode(RADIANS);
}

function draw() {
  angleA = map(mouseX, 0, width, -0.01, 0.01);
  angleV = constrain(angleV, -0.2, 0.2);

  background(146, 83, 161);
  noStroke();
  fill(240, 99, 164);
  rectMode(CENTER);
  translate(200, 200);
  rotate(angle);
  rect(0, 0, 256, 32);

  angle += angleV;
  angleV += angleA;
}
