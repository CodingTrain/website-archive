// The Prime Spiral (aka Ulam Spiral)
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/167-prime-spiral.html
// https://youtu.be/a35KWEjRvc0

int x, y;
int px, py;
int step = 1;
int stepSize = 20;
int numSteps = 1;
int state = 0;
int turnCounter = 1;
int totalSteps;

int cols, rows;

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
  size(500, 500);
  textFont(createFont("Courier", 32));

  cols = width / stepSize;
  rows = height / stepSize;
  totalSteps = cols * rows;

  x = width / 2;
  y = height / 2;
  px = x;
  py = y;
  background(0);
}

void draw() {
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
    square(0, 0, stepSize * 0.5);
    pop();
  } else {
    float r = stepSize * 0.5;
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
