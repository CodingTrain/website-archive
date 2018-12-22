float d = 8;
float n = 5;

void setup() {
  size(400, 400);
}

void draw() {
  float k = n / d;
  background(51);
  translate(width / 2, height / 2);

  beginShape();
  stroke(255);
  noFill();
  strokeWeight(1);
  for (float a = 0; a < TWO_PI * d; a += 0.02) {
    float r = 200 * cos(k * a);
    float x = r * cos(a);
    float y = r * sin(a);
    vertex(x, y);
  }
  endShape(CLOSE);
}