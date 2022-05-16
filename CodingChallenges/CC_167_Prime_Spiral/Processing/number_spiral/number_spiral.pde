// The Prime Spiral (aka Ulam Spiral)
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/167-prime-spiral.html
// https://youtu.be/a35KWEjRvc0


int x, y;
int px, py;
int step = 1;
int stepSize = 50;
int numSteps = 1;
int state = 0;
int turnCounter = 1;
int totalSteps;

boolean isPrime(int value) {
  if (value == 1) return false;
  for (int i = 2; i <= sqrt(value); i++) {
    if (value % i == 0) {
      return false;
    }
  }
  return true;
}

void setup() {
  size(550, 550);

  int cols = width / stepSize;
  int rows = height / stepSize;
  totalSteps = cols * rows;

  x = width / 2;
  y = height / 2;
  px = x;
  py = y;
  background(0);
}

void draw() {
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
  square(x, y, stepSize);
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
