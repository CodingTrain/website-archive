// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/hacZU523FyM
// Processing transcription: Chuck England

class Laser {
  PVector pos;
  PVector vel;

  Laser(PVector spos_, float angle_) {
    pos = new PVector(spos_.x, spos_.y);
    vel = PVector.fromAngle(angle_);
    vel.mult(10);
  }

  void update() {
    pos.add(vel);
  }
  
  void render() {
    pushMatrix();
    stroke(255);
    strokeWeight(4);
    point(pos.x, pos.y);
    popMatrix();
  }

  boolean hits(Asteroid asteroid) {
    float d = dist(pos.x, pos.y, asteroid.pos.x, asteroid.pos.y);
    if (d < asteroid.r) {
      return true;
    } else {
      return false;
    }
  }

  boolean offscreen() {
    if (pos.x > width || pos.x < 0) {
      return true;
    }
    
    if (pos.y > height || pos.y < 0) {
      return true;
    }
    return false;
  }
};
