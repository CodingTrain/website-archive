// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Video: https://youtu.be/xXjRlEr7AGk

class Segment {
  PVector a;
  float len;
  float angle;
  float selfAngle;

  float t = random(1000);

  Segment parent = null;
  Segment child = null;
  float sw = 1;

  PVector b;

  Segment(Segment parent_, float len_, float angle_, float index) {
    parent = parent_;
    a = parent.b.copy();
    len = len_;
    angle = angle_;
    selfAngle = angle;
    calculateB();
    sw = 10-index*2;
    //t = t_;
  }


  Segment(float x, float y, float len_, float angle_, float index) {
    a = new PVector(x, y);
    len = len_;
    angle = angle_;
    calculateB();
    parent = null;
    sw = 10-index*2;
    //t = t_;
  }

  void wiggle() {
    float maxangle = 2;
    float minangle = -2;
    selfAngle = map(noise(t), 0, 1, minangle, maxangle);
    t += 0.05;
    //selfAngle = selfAngle + 0.01;
  }

  void update() {
    angle = selfAngle;
    if (parent != null) {
      a = parent.b.copy();
      angle += parent.angle;
    } else {
      angle += -PI/2;
    }
    calculateB();
  }

  void calculateB() {
    float dx = len * cos(angle);
    float dy = len * sin(angle);
    b = new PVector(a.x+dx, a.y+dy);
  }


  void show() {
    stroke(255);
    strokeWeight(sw);
    line(a.x, a.y, b.x, b.y);
  }
}
