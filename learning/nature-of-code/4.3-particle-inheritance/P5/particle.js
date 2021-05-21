// Particle System Inheritance
// The Nature of Code
// The Coding Train / Daniel Shiffman
// https://youtu.be/44RSr49m6LU
// https://thecodingtrain.com/learning/nature-of-code/4.3-particle-inheritance.html
// https://editor.p5js.org/codingtrain/sketches/vYgv7Xagg

class Particle extends p5.Vector {
  constructor(x, y) {
    super(x, y);
    this.vel = p5.Vector.random2D();
    this.vel.mult(random(0.5, 2));
    this.acc = createVector(0, 0);
    this.r = 8;
    this.lifetime = 255;
  }

  finished() {
    return this.lifetime < 0;
  }

  applyForce(force) {
    this.acc.add(force);
  }

  update() {
    this.vel.add(this.acc);
    this.add(this.vel);
    this.acc.set(0, 0);
    this.lifetime -= 5;
  }

  show() {
    stroke(255, this.lifetime);
    strokeWeight(2);
    fill(255, this.lifetime);

    ellipse(this.x, this.y, this.r * 2);
  }
}
