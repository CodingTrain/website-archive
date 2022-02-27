class Spiral {
  int x, y;
  int px, py;
  int w, h;
  int cols, rows;
  PVector pos;
  int step, stepSize, totalSteps, numSteps;
  int turnCounter;
  int state;

  Spiral(int x, int y, int w, int h) {
    stepSize = 5;
    pos = new PVector(x, y);
    cols = w / stepSize;
    rows = h / stepSize;
    totalSteps = cols * rows;
    this.x = 0;
    this.y = 0;
    px = this.x;
    py = this.y;
    step = 1;
    numSteps = 1;
    turnCounter = 1;
    state = 0;
  }

  void update(boolean isRandom) {
    push();
    translate(this.pos.x, this.pos.y);
    noStroke();
    boolean result;
    if (isRandom) {
      result = isRandom(step);
    } else {
      result = isPrime(step);
    }
    if (result) {
      fill(255);
      circle(this.x, this.y, this.stepSize * 0.75);
    } else {
      fill(50);
      circle(this.x, this.y, this.stepSize * 0.75);
    }
    strokeWeight(1);
    stroke(255, 50);
    //line(x, y, px, py);
    pop();
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

  boolean isRandom(int value) {
    return random(1) < 1 / log(value);
  }

  boolean isPrime(int value) {
    if (value == 1) return false;
    for (int i = 2; i <= sqrt(value); i++) {
      if (value % i == 0) {
        return false;
      }
    }
    return true;
  }
}
