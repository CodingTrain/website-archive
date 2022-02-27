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

ArrayList<Spot> spots = new ArrayList<>();

void setup() {
  size(500, 500, P3D);

  cols = width / stepSize;
  rows = height / stepSize;
  totalSteps = cols * rows;

  x = 0;
  y = 0;
  px = x;
  py = y;
  background(0);
}

void draw() {
  // textSize(stepSize);
  // textAlign(CENTER, CENTER);
  //text(step, x, y);
  background(0);
  noStroke();
  translate(width / 2, width / 2, -width);
  rotateX(PI / 3);
  rotateZ(frameCount * 0.01);
  lights();

  for (Spot s : spots) {
    s.show();
  }

  for (int n = 0; n < 2; n++) {
    spots.add(new Spot(x, y, step));

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
