// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Video: https://youtu.be/RTc6i-7N3ms

Segment end;
Segment start;
PVector base;

void setup() {
  size(600, 400);
  start = new Segment(300, 200, 50, 0);
  Segment current = start;

  for (int i = 0; i < 4; i++) {
    Segment next = new Segment(current, 50, i);
    current.child = next;
    current = next;
  }
  end = current;
  base = new PVector(width/2, height);
}

void draw() {
  background(51);

  end.follow(mouseX, mouseY);
  end.update();

  Segment next = end.parent;
  while (next != null) {
    next.follow();
    next.update();
    next = next.parent;
  }


  start.setA(base);
  start.calculateB();
  next = start.child;
  while (next != null) {
    next.attachA();
    next.calculateB();
    next = next.child;
  }

  end.show();

  next = end.parent;
  while (next != null) {
    next.show();
    next = next.parent;
  }
}
