// Mutual Attraction (N-Body Simulation)
// The Nature of Code
// The Coding Train / Daniel Shiffman
// https://youtu.be/GjbKsOkN1Oc?list=PLRqwX-V7Uu6ZV4yEcW3uDwOgGXKUUsPOM
// https://thecodingtrain.com/learning/nature-of-code/2.6-mutual-attraction.html

// N-Body: https://editor.p5js.org/codingtrain/sketches/bEt7eLZ6Y
// N-Body w/ Barnes-Hut: https://editor.p5js.org/codingtrain/sketches/joXNoi9WL

class Mover {
  constructor(x, y, vx, vy, m) {
    this.pos = createVector(x, y);
    this.vel = createVector(vx, vy);
    this.acc = createVector(0, 0);
    this.mass = m;
    this.r = sqrt(this.mass) * 2;
  }

  applyForce(force) {
    let f = p5.Vector.div(force, this.mass);
    this.acc.add(f);
  }

  attract(mover) {
    let force = p5.Vector.sub(this.pos, mover.pos);
    let distanceSq = constrain(force.magSq(), 100, 1000);
    let strength = (G * (this.mass * mover.mass)) / distanceSq;
    force.setMag(strength);
    mover.applyForce(force);
  }

  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.vel.limit(15);
    this.acc.set(0, 0);
  }

  show() {
    noStroke();
    strokeWeight(8);
    //fill(255, 200);
    //ellipse(this.pos.x, this.pos.y, this.r);
    stroke(255);
    point(this.pos.x, this.pos.y);
  }
}
