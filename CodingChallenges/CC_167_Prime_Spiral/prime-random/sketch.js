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
let numSteps = 1;
let state = 0;
let turnCounter = 1;
let totalSteps;

class Spiral {
  constructor(x, y, w, h) {
    this.stepSize = 5;
    this.pos = createVector(x, y);
    const cols = w / this.stepSize;
    const rows = h / this.stepSize;
    this.totalSteps = cols * rows;
    this.x = 0;
    this.y = 0;
    this.px = this.x;
    this.py = this.y;
    this.step = 1;
    this.numSteps = 1;
    this.turnCounter = 1;
    this.state = 0;
  }

  update(testFunction) {
    push();
    translate(this.pos.x, this.pos.y);
    noStroke();
    if (testFunction(this.step)) {
      fill(255);
      circle(this.x, this.y, this.stepSize * 0.75);
    } else {
      fill(50);
      circle(this.x, this.y, this.stepSize * 0.75);
    }
    strokeWeight(1);
    stroke(255, 50);
    //line(this.x, this.y, this.px, this.py);
    pop();
    this.px = this.x;
    this.py = this.y;

    switch (this.state) {
      case 0:
        this.x += this.stepSize;
        break;
      case 1:
        this.y -= this.stepSize;
        break;
      case 2:
        this.x -= this.stepSize;
        break;
      case 3:
        this.y += this.stepSize;
        break;
    }

    if (this.step % this.numSteps == 0) {
      this.state = (this.state + 1) % 4;
      this.turnCounter++;
      if (this.turnCounter % 2 == 0) {
        this.numSteps++;
      }
    }
    this.step++;

    if (this.step > this.totalSteps) {
      noLoop();
    }
  }
}

function isRandom(value) {
  return random(1) < 1 / log(value);
}

function isPrime(value) {
  if (value == 1) return false;
  for (let i = 2; i <= sqrt(value); i++) {
    if (value % i == 0) {
      return false;
    }
  }
  return true;
}

let spiral1, spiral2;
function setup() {
  createCanvas(1000, 550);
  textFont('Courier-Bold');
  background(51);
  spiral1 = new Spiral(250, 250, 465, 465);
  spiral2 = new Spiral(750, 250, 465, 465);
  rectMode(CENTER);
  stroke(255);
  fill(0);
  rect(250, 250, 465, 465);
  rect(750, 250, 465, 465);
  fill(255);
  textSize(32);
  textAlign(CENTER);
  noStroke();
  text('prime', 250, 525);
  text('random', 750, 525);
}

function draw() {
  // textSize(stepSize);
  // textAlign(CENTER, CENTER);
  //text(step, x, y);
  //frameRate(1);
  for (let i = 0; i < 10; i++) {
    spiral1.update(isPrime);
    spiral2.update(isRandom);
  }
}
