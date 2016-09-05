class Circle {
  float x, y, r;

  boolean growing = true;

  Circle(float x_, float y_, float r_) {
    x = x_;
    y = y_;
    r = r_;
  }
  
  boolean edges() {
    return (r > width - x || r > x || r > height-y || r > y);
  }

  void grow() {
    r++;
  }

  void show() {
    //stroke(255);
    noStroke();
    fill(255, 0, 175);
    ellipse(x, y, r*2, r*2);
  }
}