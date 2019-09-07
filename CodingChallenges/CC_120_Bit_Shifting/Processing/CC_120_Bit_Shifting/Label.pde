// Chuck England
// Written for Processing:
//   Daniel Shiffman
//   http://youtube.com/thecodingtrain
//   http://codingtra.in
//
// Note that the original p5.js example uses a DOM
// object to display the value.

class Label {
  String text;
  float x;
  float y;

  Label(String text_, float x_, float y_) {
    text = text_;
    x = x_;
    y = y_;
  }

  void setText(String text_) {
    text = text_;
  }

  void show() {
    noStroke();
    fill(255);
    textSize(50);
    textAlign(LEFT);
    text(text, x, y);
  }
};
