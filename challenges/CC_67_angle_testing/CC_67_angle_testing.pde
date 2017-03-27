
void setup() {

  size(400, 400);
}

void draw() {
  background(255);
  float angle = map(mouseX, 0, width, 225, 135);
  float x = 100 * cos(radians(angle));
  float y = 100 * sin(radians(angle));
  line(200, 200, 200+x, 200+y);
}