// The Chaos Game
// Daniel Shiffman
// Part 1: https://youtu.be/7gNzMtYo9n4
// https://thecodingtrain.com/CodingChallenges/123.1-chaos-game
// Part 2: https://youtu.be/A0NHGTggoOQ
// https://thecodingtrain.com/CodingChallenges/123.2-chaos-game

float ax, ay;
float bx, by;
float cx, cy;
float x, y;

void setup() {
  fullScreen();
  ax = width / 2;
  ay = 0;
  bx = 0;
  by = height;
  cx = width;
  cy = height;
  x = random(width);
  y = random(height);
  background(0);
  stroke(255);
  strokeWeight(8);
  point(ax, ay);
  point(bx, by);
  point(cx, cy);
}

void draw() {

  for (int i = 0; i < 100; i++) {
    strokeWeight(2);
    point(x, y);
    int r = floor(random(3));
    if (r == 0) {
      stroke(255, 0, 255);
      x = lerp(x, ax, 0.5);
      y = lerp(y, ay, 0.5);

    } else if (r == 1) {
      stroke(0, 255, 255);
      x = lerp(x, bx, 0.5);
      y = lerp(y, by, 0.5);
    } else if (r == 2) {
      stroke(255, 255, 0);
      x = lerp(x, cx, 0.5);
      y = lerp(y, cy, 0.5);
    }
  }
}
