// Angular Motion (Gravitational Attraction)
// The Nature of Code
// The Coding Train / Daniel Shiffman
// https://youtu.be/i2ROE_mAhU0
// https://thecodingtrain.com/learning/nature-of-code/3.2-angular-motion.html

// Rectangle Acceleration: https://editor.p5js.org/codingtrain/sketches/RR9XUN1mf
// Rectangle Grab Exercise: https://editor.p5js.org/codingtrain/sketches/In9e8j6t_
// Gravitational Attraction: https://editor.p5js.org/codingtrain/sketches/Y-yxvkkZk

class Mover {
  constructor(x, y, m) {
    this.pos = createVector(x, y);
    this.vel = p5.Vector.random2D();
    this.vel.mult(5);
    this.acc = createVector(0, 0);
    this.mass = m;
    this.r = sqrt(this.mass) * 2;

    this.angle = 0;
    this.angleV = 0;
    this.angleA = 0;
  }

  applyForce(force) {
    let f = p5.Vector.div(force, this.mass);
    this.acc.add(f);
  }

  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);

    this.angleA = this.acc.y / 50.0;

    this.angleV += this.angleA;
    this.angle += this.angleV;

    this.acc.set(0, 0);
  }

  show() {
    stroke(255);
    strokeWeight(2);
    fill(255, 100);
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.angle);
    line(0, 0, this.r, 0);
    ellipse(0, 0, this.r * 2);
    pop();
  }
}
