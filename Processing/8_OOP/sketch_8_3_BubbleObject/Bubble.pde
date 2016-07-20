class Bubble {

  float x;
  float y;
  float diameter;

  Bubble(float tempD) {
    x = width/2;
    y = height;
    diameter = tempD;
  }

  void ascend() {
    y--;
    x = x + random(-2,2);
  }

  void display() {
    stroke(0);
    fill(127,100);
    ellipse(x, y, diameter, diameter);
  }

  void top() {
    if (y < -diameter/2) {
      y = height+diameter/2;
    }
  }
}

