// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/cXgA1d_E-jY

class Bird {
  PVector pos;
  PVector vel;
  PVector acc;
  float r = 16;

  Bird() {
    pos = new PVector(50, height/2);
    vel = new PVector(0, 0);
    acc = new PVector();
  }

  void applyForce(PVector force) {
    acc.add(force);
  }

  void update() {
    applyForce(gravity);
    pos.add(vel);
    vel.add(acc);
    vel.limit(4);
    acc.mult(0);

    if (pos.y > height) {
      pos.y = height;
      vel.mult(0);
    }
  }

  void show() {
    stroke(255);
    fill(255);
    ellipse(pos.x, pos.y, r*2, r*2);
  }
}
