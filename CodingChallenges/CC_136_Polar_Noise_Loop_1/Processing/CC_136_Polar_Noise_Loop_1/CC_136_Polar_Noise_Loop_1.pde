// Polar Perlin Noise Loop
// Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/136-polar-perlin-noise-loops.html
// https://youtu.be/ZI1dmHv3MeM
// https://editor.p5js.org/codingtrain/sketches/sy1p1vnQn

float phase = 0;
float zoff = 0;

void setup() {
  size(400, 400);
}

void draw() {
  background(0);
  translate(width / 2, height / 2);
  stroke(255);
  strokeWeight(2);
  noFill();
  beginShape();
  float noiseMax = map(mouseX, 0, width, 1, 5);
  for (float a = 0; a < TWO_PI; a += radians(5)) {
    float xoff = map(cos(a + phase), -1, 1, 0, noiseMax);
    float yoff = map(sin(a + phase), -1, 1, 0, noiseMax);
    float r = map(noise(xoff, yoff, zoff), 0, 1, 100, height / 2);
    float x = r * cos(a);
    float y = r * sin(a);
    vertex(x, y);
  }
  endShape(CLOSE);
  phase += 0.003;
  zoff += 0.01;
}
