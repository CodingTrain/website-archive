class Bubble {

  float x;
  float y;
  float diameter;

  boolean popped = false;

  Bubble(float tempD) {
    x = random(width);
    y = height;
    diameter = tempD;
  }

  void clicked(float mx, float my) {
    float d = dist(x, y, mx, my);
    if (d < diameter/2) {
      popped = true;
    }
  }

  void ascend() {
    y--;
    x = x + random(-2, 2);
  }

  void display() {
    if (!popped) {
      stroke(0);
      fill(127, 100);
      ellipse(x, y, diameter, diameter);
    }
  }

  void top() {
    if (y < -diameter/2) {
      y = height+diameter/2;
    }
  }
}