
PImage frog;

void setup() {
  size(858, 536);
  frog = loadImage("frog.jpg");
  background(0);
}

void draw() {
  //image(frog, 0, 0);
  for (int i = 0; i < 500; i++) {
    float x = random(width);
    float y = random(height);
    color c = frog.get(int(x), int(y));
    fill(c, 25);
    noStroke();
    ellipse(x, y, 16, 16);
  }
}
