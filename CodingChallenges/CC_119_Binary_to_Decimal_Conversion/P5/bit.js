// Binary to Decimal Conversion
// Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/119-binary-decimal-conversion.html
// https://youtu.be/meGcdIoTYgw
// https://editor.p5js.org/codingtrain/sketches/HJn1hOPjX

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
    if (this.state) {
      fill(0);
    } else {
      fill(255);
    }
    ellipse(this.x, this.y, this.diameter);
  }
}
