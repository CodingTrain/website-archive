// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Video: https://youtu.be/10st01Z0jxc

class Segment {
  PVector a;
  float angle = 0;
  float len;
  PVector b = new PVector();
  float sw = 0;

  Segment(float x, float y, float len_, float i) {
    a = new PVector(x, y);
    sw = map(i, 0, 20, 1, 10);
    len = len_;
    calculateB();
  }

  Segment(Segment parent, float len_, float i) {
    sw = map(i, 0, 20, 1, 10);
    a = parent.b.copy();
    len = len_;
    calculateB();
  }



  void follow(Segment child) {
    float targetX = child.a.x;
    float targetY = child.a.y;
    follow(targetX, targetY);
  }

  void follow(float tx, float ty) {
    PVector target = new PVector(tx, ty);
    PVector dir = PVector.sub(target, a);
    angle = dir.heading();
    dir.setMag(len);
    dir.mult(-1);
    a = PVector.add(target, dir);
  }

  void setA(PVector pos) {
    a = pos.copy();
    calculateB();
  }

  void calculateB() {
    float dx = len * cos(angle);
    float dy = len * sin(angle);
    b.set(a.x+dx, a.y+dy);
  }

  void update() {
    calculateB();
  }


  void show() {
    stroke(255);
    strokeWeight(4);
    line(a.x, a.y, b.x, b.y);
  }
}
