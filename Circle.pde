// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/QHEQuoIKgNE

class Circle {
  float x;
  float y;
  float r;
  int change = 255;
  

  boolean growing = true;

  Circle(float x_, float y_) {
    x = x_;
    y = y_;
    r = 1;
  }

  void grow() {
    if (growing) {
      r = r + 0.5;
    }
  }
  
  boolean edges() {
    return (x + r > width || x -  r < 0 || y + r > height || y -r < 0);
  }

  void show() {
    //stroke(255);
    strokeWeight(2);
    if(change == 0){
    stroke(200);
    }else{
     stroke(change,200);
    }
    noFill();
    ellipse(x, y, r*2, r*2);
  }
}