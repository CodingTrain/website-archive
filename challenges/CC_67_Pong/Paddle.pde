
class Paddle {
  float x;
  float y = height/2;
  float w = 20;
  float h = 100;

  float ychange = 0;

  Paddle(boolean left) {
    if (left) {
      x = w;
    } else {
      x = width - w;
    }
  }
  
  void update() {
    y += ychange; 
    y = constrain(y, h/2, height-h/2);
  }
    

  void move(float steps) {
    ychange = steps;
  }

  void show() {
    fill(255);
    rectMode(CENTER);
    rect(x, y, w, h);
  }
}