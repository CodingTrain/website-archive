// What is a Vector
// The Nature of Code
// The Coding Train / Daniel Shiffman
// https://youtu.be/bKEaK7WNLzM
// https://thecodingtrain.com/learning/nature-of-code/1.1-what-is-a-vector.html
// https://editor.p5js.org/codingtrain/sketches/JmEToUfk

class Walker {
  constructor(x, y) {
    this.pos = createVector(x, y);
  }

  update() {
    this.pos.x = this.pos.x + random(-1, 1);
    this.pos.y = this.pos.y + random(-1, 1);
  }

  show() {
    stroke(255, 100);
    strokeWeight(2);
    point(this.pos.x, this.pos.y);
  }
}
