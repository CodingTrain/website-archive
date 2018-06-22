// Coding Train
// Ported to processing by Max (https://github.com/TheLastDestroyer)
// Origional JS by Daniel Shiffman
// http://patreon.com/codingtrain
// Code for: https://youtu.be/BjoM9oKOAKY

class Particle{
  
  PVector pos = new PVector(random(width), random(height));
  PVector vel = new PVector(0, 0);
  PVector acc = new PVector(0, 0);
  int maxspeed = 4;
  int h = 0;
  int scl, cols;

  PVector prevPos = pos.copy();
  
  
  Particle(int _cols, int _scl) {
    cols = _cols;
    scl = _scl;
  }

  void update() {
    vel.add(acc);
    vel.limit(maxspeed);
    pos.add(vel);
    acc.mult(0);
  }
  
  void follow(PVector[] vectors) {
    int x = floor(pos.x / scl);
    int y = floor(pos.y / scl);
    int index = x + y * cols;
    PVector force = vectors[index];
    applyForce(force);
  }

  void applyForce(PVector force) {
    acc.add(force);
  }

  void show() {
    stroke(h, 255, 255, 25);
    h = h + 1;
    if (h > 255) {
      h = 0;
    }
    strokeWeight(1);
    line(pos.x, pos.y, prevPos.x, prevPos.y);
    updatePrev();
  }

  void updatePrev() {
    prevPos.x = pos.x;
    prevPos.y = pos.y;
  }

  void edges() {
    if (pos.x > width) {
      pos.x = 0;
      updatePrev();
    }
    if (pos.x < 0) {
      pos.x = width-1;
      updatePrev();
    }
    if (pos.y > height) {
      pos.y = 0;
      updatePrev();
    }
    if (pos.y < 0) {
      pos.y = height-1;
      updatePrev();
    }
  }
}
