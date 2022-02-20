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
let stepSize = 20;
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
  createCanvas(500, 500);
  textFont('Courier');

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
  // textSize(stepSize);
  // textAlign(CENTER, CENTER);
  //text(step, x, y);
  noStroke();

  if (!isPrime(step)) {
    fill(45, 197, 244);
    rectMode(CENTER);
    push();
    translate(x, y);
    rotate(frameCount * 0.01);
    rect(0, 0, stepSize * 0.5);
    pop();
  } else {
    let r = stepSize * 0.5;
    fill(240, 99, 164);
    push();
    translate(x, y);
    rotate(-PI / 4);
    triangle(-r, +r, 0, -r, +r, +r);
    pop();
  }
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

  //frameRate(1);
}
