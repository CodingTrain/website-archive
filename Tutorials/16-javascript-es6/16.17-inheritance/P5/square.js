// Inheritance in JavaScript
// The Coding Train / Daniel Shiffman
// https://youtu.be/MfxBfRD0FVU
// https://thecodingtrain.com/Tutorials/16-javascript-es6/16.17-inheritance.html
// https://editor.p5js.org/codingtrain/sketches/52LIIRRCa

class Confetti extends Particle {
  constructor(x, y) {
    super(x, y);
    this.bright = random(255);
    this.r = 10;
  }

  update() {
    super.update();
    this.r += random(-2, 2);
  }

  show() {
    strokeWeight(1);
    stroke(255);
    fill(this.bright);
    square(this.x, this.y, this.r);
  }
}
