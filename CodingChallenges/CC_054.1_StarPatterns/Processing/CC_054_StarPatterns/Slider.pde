// Chuck England
// Written for Processing:
//   Daniel Shiffman
//   http://youtube.com/thecodingtrain
//   http://codingtra.in
//
// Note that the original p5.js example uses a DOM
// object for the slider.

class Slider {
  float x;
  float y;
  float min;
  float max;
  float value;
  float increment;
  
  float w = 200;
  float h = 20;
  float controlSize = 7;
  
  Boolean isDragging = false;
  
  Slider(float x_, float y_, float min_, float max_, float start_, float increment_) {
    x = x_;
    y = y_;
    min = min_;
    max = max_;
    value = start_;
    increment = increment_;
  }
  
  float value() {
    return value;
  }
  
  void handleInteractions() {
    if (isDragging) {
      if (mousePressed) {
        float x1 = screenX(xPosition(value), y);
        float d = mouseX - x1;
        float change = d * (max - min) / w;
        value += change;
        value -= value % increment;
        value = min(max, max(min, value));
      } else {
        isDragging = false;
        println("end drag");
      }
    } else {
      float x1 = xPosition(value);
      if (mousePressed && mouseY >= screenY(x1, y) && mouseY <= screenY(x1, y+h) && mouseX >= screenX(x1-controlSize/2,y) && mouseX <= screenX(x1+controlSize/2,y)) {
        println("start drag");
        isDragging = true;
      }
    }
  }
  
  float xPosition(float val) {
    return min(x+w, max(x, map(val, min, max, x, x+w)));
  }
  
  void show() {
    handleInteractions();
    
    stroke(255);
    fill(0);
    rect(x, y + h/3, w, h/3, 2);
    
    float x1 = xPosition(value);
    stroke(200, 200, 200);
    fill(128, 128, 128);
    rect(x1-controlSize/2, y, controlSize, h, 2);
  }
};
