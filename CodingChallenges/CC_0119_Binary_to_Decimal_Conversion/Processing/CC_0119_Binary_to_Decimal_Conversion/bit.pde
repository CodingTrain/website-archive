// Daniel Shiffman
// http://youtube.com/thecodingtrain
// http://codingtra.in
// Processing transcription: Chuck England

// Coding Challenge 120: Bit Shifting
// https://youtu.be/oCBlwsY8sR4

// p5.js editor version: 0.7.2 (December 21, 2018)
// https://editor.p5js.org/codingtrain/sketches/Hk8CVYvi7

class Bit {
  float x;
  float y;
  float diameter;
  Boolean state;

  Bit(float x_, float y_, float d_) {
    x = x_;
    y = y_;
    diameter = d_;
    state = false;
  }

  void setState(Boolean state_) {
    state = state_;
  }

  void toggle(float x, float y) {
    float d = dist(x, y, this.x, this.y);
    if (d < diameter / 2) {
      state = !state;
    }
  }

  void show() {
    stroke(255);
    strokeWeight(2);
    fill(state ? color(0, 255, 0) : color(0));
    ellipse(x, y, diameter, diameter);
  }
}
