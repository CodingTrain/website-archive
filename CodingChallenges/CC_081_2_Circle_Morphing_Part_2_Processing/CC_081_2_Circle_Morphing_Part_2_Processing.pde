// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain

// Circle Morphing Part 2
// Edited Video: Coming Soon

// Originally written using p5.js

ArrayList<Point> cirPath;
int spacing = 2;

PVector polarToCartesian(float r, float angle) {
  return new PVector(r * cos(radians(angle)), r * sin(radians(angle)));
}


void setup() {
  size(400, 400);
  
  cirPath = new ArrayList<Point>();
  
  float radius = 200;
  int i = 0;
  for (int a = 0; a < 360; a += spacing) {
    Point cv = new Point();
    cv.coords = polarToCartesian(radius, a);
    cv.active = true;
    if (a % 120 == 0) {
      cv.fixed = true;
    }
    cirPath.add(cv);

  }

}

void draw() {

  background(220);
  translate(width / 2, height / 2);
  rotate(radians(30));
  stroke(0);
  strokeWeight(2);
  noFill();
  beginShape();
  for (int i = 0; i < cirPath.size(); i++) {
    Point v = cirPath.get(i);
    if (v.active) {
      vertex(v.coords.x, v.coords.y);
    }
  }
  endShape(CLOSE);

  ArrayList<Point> activeList = new ArrayList<Point>();
  for (int i = 0; i < cirPath.size(); i++) {
    Point v = cirPath.get(i);
    if (v.active && !v.fixed) {
      activeList.add(v);
    }
  }

  int index = 0; //floor(random(activeList.size()));
  if (index < activeList.size()) {
    Point v = activeList.get(index);
    v.active = false;
  }

}

class Point {
  PVector coords;
  boolean active;
  boolean fixed;
}