// More Steering Behaviors! (Wander)
// The Nature of Code
// The Coding Train / Daniel Shiffman
// https://youtu.be/Q4MU7pkDYmQ
// https://thecodingtrain.com/learning/nature-of-code/5.3-flee-pursue-evade.html

// Flee: https://editor.p5js.org/codingtrain/sketches/v-VoQtETO
// Pursue: https://editor.p5js.org/codingtrain/sketches/Lx3PJMq4m
// Evade: https://editor.p5js.org/codingtrain/sketches/X3ph02Byx
// Pursue Bouncing Ball: https://editor.p5js.org/codingtrain/sketches/itlyDq3ZB
// Pursue Wander: https://editor.p5js.org/codingtrain/sketches/EEnmY04lt
// Pursue Slider Prediction: https://editor.p5js.org/codingtrain/sketches/l7MgPpTUB

class Vehicle {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.maxSpeed = 4.5;
    this.maxForce = 0.25;
    this.r = 16;
  }

  evade(vehicle) {
    let pursuit = this.pursue(vehicle);
    pursuit.mult(-1);
    return pursuit;
  }

  pursue(vehicle) {
    let target = vehicle.pos.copy();
    let prediction = vehicle.vel.copy();
    prediction.mult(10);
    target.add(prediction);
    // stroke(255, 50);
    // line(vehicle.pos.x,vehicle.pos.y, target.x, target.y);
    // fill(0, 255, 0, 50);
    // circle(target.x, target.y, 16);
    return this.seek(target);
  }

  flee(target) {
    return this.seek(target).mult(-1);
  }

  seek(target) {
    let force = p5.Vector.sub(target, this.pos);
    force.setMag(this.maxSpeed);
    force.sub(this.vel);
    force.limit(this.maxForce);
    return force;
  }

  applyForce(force) {
    this.acc.add(force);
  }

  update() {
    this.vel.add(this.acc);
    this.vel.limit(this.maxSpeed);
    this.pos.add(this.vel);
    this.acc.set(0, 0);
  }

  show() {
    stroke(255);
    strokeWeight(2);
    fill(255);
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.vel.heading());
    triangle(-this.r, -this.r / 2, -this.r, this.r / 2, this.r, 0);
    pop();
  }

  edges() {
    if (this.pos.x > width + this.r) {
      this.pos.x = -this.r;
    } else if (this.pos.x < -this.r) {
      this.pos.x = width + this.r;
    }
    if (this.pos.y > height + this.r) {
      this.pos.y = -this.r;
    } else if (this.pos.y < -this.r) {
      this.pos.y = height + this.r;
    }
  }
}
const debug = true;

class Target extends Vehicle {
  constructor(x, y) {
    super(x, y);
    this.maxForce = 0.05;
    this.vel = p5.Vector.random2D();
    this.vel.mult(10);
    this.maxSpeed = 4;
    this.wandertheta = 0;
  }

  wander() {
    let wanderR = 24;
    let wanderD = 120;
    let change = 0.2;
    this.wandertheta += random(-change, change);

    let pos = this.vel.copy();
    pos.normalize();
    pos.mult(wanderD);
    pos.add(this.pos);

    let h = this.vel.heading();

    let offset = createVector(
      wanderR * cos(this.wandertheta + h),
      wanderR * sin(this.wandertheta + h)
    );
    let target = p5.Vector.add(pos, offset);
    let force = this.seek(target);
    this.applyForce(force);

    if (debug) this.drawWanderStuff(this.pos, pos, target, wanderR);
  }

  show() {
    stroke(255);
    strokeWeight(2);
    fill("#F063A4");
    push();
    translate(this.pos.x, this.pos.y);
    circle(0, 0, this.r * 2);
    pop();
  }

  // A method just to draw the circle associated with wandering
  drawWanderStuff(location, pos, target, rad) {
    stroke(255, 150);
    noFill();
    ellipseMode(CENTER);
    circle(pos.x, pos.y, rad * 2);
    fill(255);
    circle(target.x, target.y, 8);
    line(location.x, location.y, pos.x, pos.y);
    line(pos.x, pos.y, target.x, target.y);
  }
}
