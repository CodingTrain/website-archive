// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/hacZU523FyM
// Processing transcription: Chuck England

class Ship {
  PVector pos;
  float r;
  float heading;
  float rotation;
  PVector vel;
  boolean isBoosting;

  Ship() {
    pos = new PVector(width / 2, height / 2);
    r = 20;
    heading = 0;
    rotation = 0;
    vel = new PVector(0, 0);
    isBoosting = false;
  }

  void boosting(boolean b) {
    isBoosting = b;
  }

  void update() {
    if (isBoosting) {
      boost();
    }
    pos.add(vel);
    vel.mult(0.99);
  }

  void boost() {
    PVector force = PVector.fromAngle(heading);
    force.mult(0.1);
    vel.add(force);
  }

  boolean hits(Asteroid asteroid) {
    float d = dist(pos.x, pos.y, asteroid.pos.x, asteroid.pos.y);
    if (d < r + asteroid.r) {
      return true;
    } else {
      return false;
    }
  }

  void render() {
    pushMatrix();
    translate(pos.x, pos.y);
    rotate(heading + PI / 2);
    fill(0);
    stroke(255);
    triangle(-r, r, r, r, 0, -r);
    popMatrix();
  }

  void edges() {
    if (this.pos.x > width + this.r) {
      this.pos.x = -this.r;
    } else if (this.pos.x < -this.r) {
      this.pos.x = width + this.r;
    }
    if (this.pos.y > height + this.r) {
      this.pos.y = -this.r;
    } else if (this.pos.y < -this.r) {
      this.pos.y = height + this.r;
    }
  }

  void setRotation(float a) {
    rotation = a;
  }

  void turn() {
    heading += rotation;
  }
}
