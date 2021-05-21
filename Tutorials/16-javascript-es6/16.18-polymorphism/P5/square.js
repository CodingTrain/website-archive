// Polymorphism in JavaScript
// The Coding Train / Daniel Shiffman
// https://youtu.be/8a5BkwuZRK0
// https://thecodingtrain.com/Tutorials/16-javascript-es6/16.18-polymorphism.html
// https://editor.p5js.org/codingtrain/sketches/7MhdISflX

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
