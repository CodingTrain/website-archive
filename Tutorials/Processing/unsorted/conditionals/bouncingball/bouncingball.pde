
float circleX = 0;
float xspeed = 3;


void setup() {
  size(640, 360);
}

void draw() {
  background(51);
  fill(102);
  stroke(255);
  ellipse(circleX, height/2, 32, 32);

  circleX = circleX + xspeed;

  if (circleX > width || circleX < 0) {
    // Turn around!
    xspeed = xspeed * -0.9;
  }
}

