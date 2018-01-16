// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
Morpher m;

float amt = 1;

void setup() {
  size(600, 600);
  m = new Morpher();
}

void draw() {
  amt = map(mouseX, 0, width, 0, 1);
  background(51);
  translate(width/2, height/2);
  m.show();
  m.update();
}