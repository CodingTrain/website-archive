// Daniel Shiffman
// http://youtube.com/thecodingtrain
// http://codingtra.in

// Coding Challenge 120: Bit Shifting
// https://youtu.be/oCBlwsY8sR4

// p5.js editor version: 0.7.2 (December 21, 2018)
// https://editor.p5js.org/codingtrain/sketches/Hk8CVYvi7

class Bit {
  constructor(x, y, d) {
    this.x = x;
    this.y = y;
    this.diameter = d;
    this.state = false;
  }

  setState(state) {
    this.state = Boolean(parseInt(state));
  }

  toggle(x, y) {
    let d = dist(x, y, this.x, this.y);
    if (d < this.diameter / 2) {
      this.state = !this.state;
    }
  }

  show() {
    stroke(255);
    strokeWeight(2);
    fill(this.state ? 255 : 51);
    ellipse(this.x, this.y, this.diameter);
  }
}
