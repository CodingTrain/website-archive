// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/KWoJgHFYWxY

float n = 0;
float c = 3;

ArrayList<PVector> points = new ArrayList<PVector>();

float start = 0;

void setup() {
  size(400, 400);
  colorMode(HSB, 360, 255, 255);
}

void draw() {
  background(0);
  translate(width / 2, height / 2);
  rotate(n * 0.3);
  for (int i = 0; i < n; i++) {
    float a = i * radians(137.5);
    float r = c * sqrt(i);
    float x = r * cos(a);
    float y = r * sin(a);
    float hu = i+start;//sin(start + i * 0.5);
    hu = i/3.0 % 360;
    fill(hu, 255, 255);
    noStroke();
    ellipse(x, y, 4, 4);
  }
  n += 5;
  start += 5;
}