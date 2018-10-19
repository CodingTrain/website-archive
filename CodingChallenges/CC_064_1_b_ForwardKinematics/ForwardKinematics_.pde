// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Video: https://youtu.be/xXjRlEr7AGk

Segment tentacle;
// Segment seg2;
void setup() {
  size(600, 400);
  float t = 0;
  float len = 50;
  tentacle = new Segment(width/2, height, len, 0, 0);

  Segment current = tentacle;
  for (int i = 0; i < 5; i++) {
    t += 0.1;
    //len = len * 0.75;
    Segment next = new Segment(current, len, 0, i);
    current.child = next;
    current = next;
  }
}

void draw() {
  background(51);

  Segment next = tentacle;
  while (next != null) {
    next.wiggle();
    next.update();
    next.show();
    next = next.child;
  }
}
