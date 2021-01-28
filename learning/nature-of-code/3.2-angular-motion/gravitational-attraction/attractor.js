// Angular Motion (Gravitational Attraction)
// The Nature of Code
// The Coding Train / Daniel Shiffman
// https://youtu.be/i2ROE_mAhU0
// https://thecodingtrain.com/learning/nature-of-code/3.2-angular-motion.html

// Rectangle Acceleration: https://editor.p5js.org/codingtrain/sketches/RR9XUN1mf
// Rectangle Grab Exercise: https://editor.p5js.org/codingtrain/sketches/In9e8j6t_
// Gravitational Attraction: https://editor.p5js.org/codingtrain/sketches/Y-yxvkkZk

class Attractor {
  constructor(x, y, m) {
    this.pos = createVector(x, y);
    this.mass = m;
    this.r = sqrt(this.mass) * 2;
  }

  attract(mover) {
    let force = p5.Vector.sub(this.pos, mover.pos);
    let distanceSq = constrain(force.magSq(), 100, 1000);
    let G = 5;
    let strength = (G * (this.mass * mover.mass)) / distanceSq;
    force.setMag(strength);
    mover.applyForce(force);
  }

  show() {
    noStroke();
    fill(255, 0, 100);
    ellipse(this.pos.x, this.pos.y, this.r * 2);
  }
}
