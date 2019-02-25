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
  color clr;
  float textSize;

  Label(String text_, float x_, float y_, color clr_, float textSize_) {
    text = text_;
    x = x_;
    y = y_;
    clr = clr_;
    textSize = textSize_;
  }

  void setText(String text_) {
    text = text_;
  }

  void show() {
    noStroke();
    fill(clr);
    textSize(textSize);
    textAlign(LEFT);
    text(text, x, y);
  }
};
