class Particle {
  float x, y;
  float r;
  Particle(float x_, float y_, float r_) {
    x = x_;
    y = y_;
    r = r_;
  }

  void display() {
    stroke(255);
    noFill();
    ellipse(x, y, r*2, r*2);
  }

  boolean overlaps(Particle other) {
    float d = dist(x, y, other.x, other.y);
    if (d < r + other.r) {
      return true;
    } else {
      return false;
    }
  }
}
