// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for this video: https://youtu.be/Cl_Gjj80gPE

float yoff = 0.0;

void setup() {
  size(400, 400);
}

void draw() {
  background(0);

  translate(width / 2, height / 2);

  float radius = 150;

  beginShape();
  float xoff = 0;
  for (float a = 0; a < TWO_PI; a += 0.1) {
    float offset = map(noise(xoff, yoff), 0, 1, -25, 25);
    float r = radius + offset;
    float x = r * cos(a);
    float y = r * sin(a);
    vertex(x, y);
    xoff += 0.1;
    //ellipse(x, y, 4, 4);
  }
  endShape();

  yoff += 0.01;
}
