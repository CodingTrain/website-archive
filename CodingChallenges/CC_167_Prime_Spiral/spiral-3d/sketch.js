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

const spots = [];

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
  createCanvas(500, 500, WEBGL);

  const cols = width / stepSize;
  const rows = height / stepSize;
  totalSteps = cols * rows;

  x = 0;
  y = 0;
  px = x;
  py = y;
  background(0);
}

class Spot {
  constructor(x, y, step) {
    this.x = x;
    this.y = y;
    this.step = step;
    this.isPrime = isPrime(step);
  }
  show() {
    if (!this.isPrime) {
      fill(45, 197, 244);
      rectMode(CENTER);
      push();
      translate(this.x, this.y);
      rect(0, 0, stepSize * 0.5);
      pop();
    } else {
      let r = stepSize * 0.5;
      fill(240, 99, 164);
      push();
      translate(this.x, this.y);
      rotate(-PI / 4);
      let h = 24 + sqrt(this.step);
      translate(0, 0, h / 2);
      box(r, r, h);
      pop();
    }
  }
}

function draw() {
  // textSize(stepSize);
  // textAlign(CENTER, CENTER);
  //text(step, x, y);
  background(0);
  noStroke();
  translate(0, 0, -width / 2);
  rotateX(PI / 3);
  rotateZ(frameCount * 0.01);
  specularMaterial(255);
  lights();

  for (let s of spots) {
    s.show();
  }

  for (let n = 0; n < 2; n++) {
    spots.push(new Spot(x, y, step));

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
  }

  //   if (step > totalSteps) {
  //     noLoop();
  //   }

  //frameRate(1);
}
