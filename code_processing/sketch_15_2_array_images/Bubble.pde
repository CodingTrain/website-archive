class Bubble {

  float x;
  float y;
  float diameter;
  
  PImage img;

  Bubble(PImage tempImg, float tempX, float tempY, float tempD) {
    x = tempX;
    y = tempY;
    diameter = tempD;
    img = tempImg;
  }

  void ascend() {
    y--;
    x = x + random(-2,2);
  }

  void display() {
    stroke(0);
    fill(127);
    //ellipse(x, y, diameter, diameter);
    imageMode(CENTER);
    image(img,x,y,diameter, diameter);
  }

  void top() {
    if (y < diameter/2) {
      y = diameter/2;
    }
  }
}