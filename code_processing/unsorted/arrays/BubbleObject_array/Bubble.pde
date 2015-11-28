class Bubble {

  float x;
  float y;
  float diameter;
  
  boolean active = false;
  
  float yspeed;

  Bubble(float tempD) {
    x = random(width);
    y = height;
    diameter = tempD;
    yspeed = random(0.1,2);
  }

  void ascend() {
    y -= yspeed;
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

