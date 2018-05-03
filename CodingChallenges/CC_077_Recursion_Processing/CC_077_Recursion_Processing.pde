// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain

// Recursion
// Edited Video: https://www.youtube.com/watch?v=jPsZwrV9ld0

// Originally written using p5.js

void setup() {
  size(600, 600);
}

void draw() {
  background(0);
  stroke(255);
  noFill();
  drawCircle(300, 200, 600);
  noLoop();
}

void drawCircle(float x, float y, float d) {
  ellipse(x, y, d, d);
  if (d > 2) {
    float newD = d * 0.25;
    drawCircle(x + newD, y, newD);
    drawCircle(x - newD, y, newD);
    //drawCircle(x, y + d * 0.5, d * 0.5);
  }
}