// Particle System Inheritance
// The Nature of Code
// The Coding Train / Daniel Shiffman
// https://youtu.be/44RSr49m6LU
// https://thecodingtrain.com/learning/nature-of-code/4.3-particle-inheritance.html
// https://editor.p5js.org/codingtrain/sketches/vYgv7Xagg

class Confetti extends Particle {
  constructor(x, y) {
    super(x, y);
    this.angle = random(TWO_PI);
  }

  show() {
    noStroke();
    fill(255, this.lifetime);
    push();
    translate(this.x, this.y);
    rotate(this.angle);
    square(0, 0, this.r * 2);
    pop();
  }
}
