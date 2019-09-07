// Daniel Shiffman
// http://codingtra.in
// Attraction / Repulsion
// Video: https://youtu.be/OAcXnzRNiCY
// Processing transcription: Chuck England

class Particle {
  PVector pos;
  PVector prev;
  PVector vel;
  PVector acc;

  Particle(float x, float y) {
    pos = new PVector(x, y);
    prev = new PVector(x, y);
    vel = new PVector(); //p5.Vector.random2D();
    //vel = PVector.random2D();
    //vel.setMag(random(2, 5));
    acc = new PVector();
  }

  void update() {
    vel.add(acc);
    vel.limit(5);
    pos.add(vel);
    acc.mult(0);
  }

  void show() {
    stroke(255, 255);
    strokeWeight(4);
    line(this.pos.x, this.pos.y, this.prev.x, this.prev.y);

    prev.x = pos.x;
    prev.y = pos.y;
  }

  void attracted(PVector target) {
    // PVector dir = target - pos
    PVector force = PVector.sub(target, pos);
    float d = force.mag();
    d = constrain(d, 1, 25);
    float G = 50;
    float strength = G / (d * d);
    force.setMag(strength);
    if (d < 20) {
      force.mult(-10);
    }
    acc.add(force);
  }
};
