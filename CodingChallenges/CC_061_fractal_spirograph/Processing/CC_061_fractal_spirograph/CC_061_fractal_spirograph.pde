// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Fractal Spirograph
// Video: https://youtu.be/0dwJ-bkJwDI

ArrayList<PVector> path;

float angle = 0;
int resolution = 50;

Orbit sun;
Orbit end;

void setup() {
  size(600, 600);
  path = new ArrayList<PVector>();
  sun = new Orbit(width/2, height/2, width/4, 0);
  Orbit next = sun;
  for (int i = 0; i < 10; i++) {
    next = next.addChild();
  }
  end = next;
}

void draw() {
  background(51);

  for (int i = 0; i < resolution; i++) {
    Orbit next = sun;
    while (next != null) {
      next.update();
      next = next.child;
    }
    path.add(new PVector(end.x, end.y));
  }

  Orbit next = sun;
  while (next != null) {
    next.show();
    next = next.child;
  }

  beginShape();
  stroke(255);
  noFill();
  for (PVector pos : path) {
    vertex(pos.x, pos.y);
  }
  endShape();
}
