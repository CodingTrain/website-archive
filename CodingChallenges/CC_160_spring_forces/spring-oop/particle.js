// Spring Forces (Spring OOP)
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/160-spring-forces.html
// https://youtu.be/Rr-5HiXquhw

// Simple Spring: https://editor.p5js.org/codingtrain/sketches/dcd6-2mWa
// Spring Vector: https://editor.p5js.org/codingtrain/sketches/_A2pm_SSg
// Spring OOP: https://editor.p5js.org/codingtrain/sketches/9BAoEn4Po
// Soft Spring: https://editor.p5js.org/codingtrain/sketches/S5dY7qjxP

class Particle {
  constructor(x, y) {
    this.acceleration = createVector(0, 0);
    this.velocity = createVector(0, 0);
    this.position = createVector(x, y);
    this.mass = 1; // Let's do something better here!
  }

  applyForce(force) {
    let f = force.copy();
    f.div(this.mass);
    this.acceleration.add(f);
  }

  // Method to update position
  update() {
    this.velocity.mult(0.99);

    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  }

  // Method to display
  show() {
    stroke(255);
    strokeWeight(2);
    fill(45, 197, 244);
    ellipse(this.position.x, this.position.y, 64);
  }
}
