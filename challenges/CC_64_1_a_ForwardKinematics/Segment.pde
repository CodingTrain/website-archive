// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Video: https://youtu.be/xXjRlEr7AGk

class Segment {
  PVector a;
  float len;
  float angle;
  float selfAngle;

  float t;//random(1000);

  Segment parent = null;
  Segment child = null;

  PVector b;

  Segment(Segment parent_, float len_, float angle_, float t_) {
    parent = parent_;
    a = parent.b.copy();
    len = len_;
    angle = angle_;
    selfAngle = angle;
    calculateB();
    t = t_;
  }


  Segment(float x, float y, float len_, float angle_, float t_) {
    a = new PVector(x, y);
    len = len_;
    angle = angle_;
    selfAngle = angle;
    calculateB();
    parent = null;
    t = t_;
  }

  void wiggle() {
    float maxangle = 0.3;
    float minangle = -0.3;
    selfAngle = map(noise(t), 0, 1, minangle, maxangle);
    t += 0.03;
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
    strokeWeight(4);
    line(a.x, a.y, b.x, b.y);
  }
}
