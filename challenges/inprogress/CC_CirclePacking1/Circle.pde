class Circle {
  float x, y, r;

  Circle(float x_, float y_, float r_) {
    x = x_;
    y = y_;
    r = r_;
  }

  void show() {
    fill(255, 0, 175, 100);
    noStroke();
    ellipse(x, y, r*2, r*2);
  }
}