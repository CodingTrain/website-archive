// Chuck England
// Written for Processing:
//   Daniel Shiffman
//   http://youtube.com/thecodingtrain
//   http://codingtra.in
//
// Note that the original p5.js example uses a DOM
// object for the button.

class Button {
  String text;
  float x;
  float y;
  float w;
  float h;

  Button(String text_, float x_, float y_, float w_, float h_) {
    text = text_;
    x = x_;
    y = y_;
    w = w_;
    h = h_;
  }

  Boolean isInside() {
    return isInside(mouseX, mouseY);
  }

  Boolean isInside(float x_, float y_) {
    return x_ > x && x_ < x + w && y_ > y && y_ < y + h;
  }

  void show() {
    Boolean inside = isInside();
    stroke(inside ? color(255, 128, 0) : color(255));
    fill(mousePressed ? color(128, 128, 128) : (inside ? color(0) : color(51)));
    rect(x, y, w, h, 5);
    noStroke();
    fill(255);
    textSize(20);
    textAlign(CENTER, CENTER);
    text(text, x + w/2, y + h/2);
  }
};
