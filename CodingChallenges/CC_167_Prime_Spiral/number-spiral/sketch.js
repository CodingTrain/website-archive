// The Prime Spiral (aka Ulam Spiral)
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/167-prime-spiral.html
// https://youtu.be/a35KWEjRvc0

// Prime Spiral: https://editor.p5js.org/codingtrain/sketches/0Ud-XsaYb
// Number Spiral: https://editor.p5js.org/codingtrain/sketches/Zs65bV-Al
// Prime vs Random Spiral: https://editor.p5js.org/codingtrain/sketches/3np1hBlXD
// Shapes and Color: https://editor.p5js.org/codingtrain/sketches/mCvvSKpZ5
// Prime Spiral 3D: https://editor.p5js.org/codingtrain/sketches/-eX078HZ5

let x, y;
let px, py;
let step = 1;
let stepSize = 50;
let numSteps = 1;
let state = 0;
let turnCounter = 1;
let totalSteps;

function isPrime(value) {
  if (value == 1) return false;
  for (let i = 2; i <= sqrt(value); i++) {
    if (value % i == 0) {
      return false;
    }
  }
  return true;
}

function setup() {
  createCanvas(550, 550);

  const cols = width / stepSize;
  const rows = height / stepSize;
  totalSteps = cols * rows;

  x = width / 2;
  y = height / 2;
  px = x;
  py = y;
  background(0);
}

function draw() {
  textSize(stepSize * 0.5);
  textAlign(CENTER, CENTER);
  fill(255);
  //stroke(255);
  noStroke();
  text(step, x, y);
  stroke(255);
  strokeWeight(0.5);
  noFill();
  rectMode(CENTER);
  rect(x, y, stepSize);
  // if (isPrime(step)) {
  //   circle(x, y, stepSize * 0.5);
  // }
  // line(x, y, px, py);
  px = x;
  py = y;

  switch (state) {
    case 0:
      x += stepSize;
      break;
    case 1:
      y -= stepSize;
      break;
    case 2:
      x -= stepSize;
      break;
    case 3:
      y += stepSize;
      break;
  }

  if (step % numSteps == 0) {
    state = (state + 1) % 4;
    turnCounter++;
    if (turnCounter % 2 == 0) {
      numSteps++;
    }
  }
  step++;
  if (step > totalSteps) {
    noLoop();
  }
}
