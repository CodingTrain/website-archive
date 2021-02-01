// Angles and Vectors (Asteroids Exercise)
// The Nature of Code
// The Coding Train / Daniel Shiffman
// https://youtu.be/oXwCVDXS2Lg
// https://thecodingtrain.com/learning/nature-of-code/3.3-angles-and-vectors.html

// Direction Pointing: https://editor.p5js.org/codingtrain/sketches/9M9yQJVVc
// Vehicle: https://editor.p5js.org/codingtrain/sketches/HtXbIDsESi
// Asteroids Exercise: https://editor.p5js.org/codingtrain/sketches/pXS395i0h

// Arbitrary damping to slow down ship
const damping = 0.995;
const topspeed = 6;

// Size
const r = 16;

class Spaceship {
  constructor() {
    // All of our regular motion stuff
    this.location = new createVector(width / 2, height / 2);
    this.velocity = new createVector(0, 0);
    this.acceleration = new createVector(0, 0);
    console.log(location.toString());
    // Are we thrusting (to color boosters)
    this.thrusting = false;
    // Variable for heading!
    this.heading = 0;
  }

  // Standard Euler integration
  update() {
    this.velocity.add(this.acceleration);
    this.velocity.mult(damping);
    this.velocity.limit(topspeed);
    this.location.add(this.velocity);
    this.acceleration.mult(0);
  }

  // Newton's law: F = M * A
  applyForce(force) {
    // We could add mass here if we want A = F / M
    this.acceleration.add(force);
  }

  // Turn changes angle
  turn(a) {
    this.heading += a;
  }

  // Apply a thrust force
  thrust() {
    // Offset the angle since we drew the ship vertically
    let angle = this.heading - PI / 2;
    // Polar to cartesian for force vector!
    let force = new createVector(cos(angle), sin(angle));
    force.mult(0.1);
    this.applyForce(force);
    // To draw booster
    this.thrusting = true;
  }

  wrapEdges() {
    let buffer = r * 2;
    if (this.location.x > width + buffer) this.location.x = -buffer;
    else if (this.location.x < -buffer) this.location.x = width + buffer;
    if (this.location.y > height + buffer) this.location.y = -buffer;
    else if (this.location.y < -buffer) this.location.y = height + buffer;
  }

  // Draw the ship
  display() {
    stroke(255);
    strokeWeight(2);
    push();
    rectMode(CENTER);
    translate(this.location.x, this.location.y + r);
    rotate(this.heading);
    fill(127);
    if (this.thrusting) fill(255, 0, 0);

    // Booster rockets
    rect(-r / 2, r, r / 3, r / 2);
    rect(r / 2, r, r / 3, r / 2);
    fill(127);

    // A triangle
    beginShape();
    vertex(-r, r);
    vertex(0, -r);
    vertex(r, r);
    endShape(CLOSE);
    pop();

    this.thrusting = false;
  }
}
