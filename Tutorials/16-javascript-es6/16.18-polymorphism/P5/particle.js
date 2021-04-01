// Polymorphism in JavaScript
// The Coding Train / Daniel Shiffman
// https://youtu.be/8a5BkwuZRK0
// https://thecodingtrain.com/Tutorials/16-javascript-es6/16.18-polymorphism.html
// https://editor.p5js.org/codingtrain/sketches/7MhdISflX

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
