// Daniel Shiffman
// Code for https://www.youtube.com/watch?v=BxabnKrOjT0

ArrayList<PVector> vertices = new ArrayList<PVector>();

void setup() {
  size(640, 360);

  for (int i = 0; i < 20; i++) {
    PVector v = new PVector(random(width), random(height));
    vertices.add(v);
  }

}

void mousePressed() {
  PVector v = new PVector(mouseX, mouseY);
  vertices.add(v);
}

void draw() {
  background(51);

  ArrayList<PVector> reached = new ArrayList<PVector>();
  ArrayList<PVector> unreached = new ArrayList<PVector>();

  for (PVector v : vertices) {
    unreached.add(v);
  }

  reached.add(unreached.get(0));
  unreached.remove(0);

  while (unreached.size() > 0) {
    float record = 100000;
    int rIndex = 0;
    int uIndex = 0;
    for (int i = 0; i < reached.size(); i++) {
      for (int j = 0; j < unreached.size(); j++) {
        PVector v1 = reached.get(i);
        PVector v2 = unreached.get(j);
        float d = dist(v1.x, v1.y, v2.x, v2.y);
        if (d < record) {
          record = d;
          rIndex = i;
          uIndex = j;
        }
      }
    }
    stroke(255);
    strokeWeight(2);
    PVector p1 = reached.get(rIndex);
    PVector p2 = unreached.get(uIndex);
    line(p1.x,p1.y, p2.x, p2.y);
    reached.add(p2);
    unreached.remove(uIndex);
  }


  for (PVector v : vertices) {
    fill(255);
    stroke(255);
    ellipse(v.x, v.y, 16, 16);
  }

}