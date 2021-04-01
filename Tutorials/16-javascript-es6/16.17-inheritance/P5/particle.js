// Inheritance in JavaScript
// The Coding Train / Daniel Shiffman
// https://youtu.be/MfxBfRD0FVU
// https://thecodingtrain.com/Tutorials/16-javascript-es6/16.17-inheritance.html
// https://editor.p5js.org/codingtrain/sketches/52LIIRRCa

class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  update() {
    this.x += random(-5, 5);
    this.y += random(-5, 5);
  }

  show() {
    stroke(255);
    strokeWeight(24);
    point(this.x, this.y);
  }
}
