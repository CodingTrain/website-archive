// Spring Forces (Spring OOP Port)
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/160-spring-forces.html
// https://youtu.be/Rr-5HiXquhw

// Simple Spring: https://editor.p5js.org/codingtrain/sketches/dcd6-2mWa
// Spring Vector: https://editor.p5js.org/codingtrain/sketches/_A2pm_SSg
// Spring OOP: https://editor.p5js.org/codingtrain/sketches/9BAoEn4Po
// Soft Spring: https://editor.p5js.org/codingtrain/sketches/S5dY7qjxP

class Particle {
  
  PVector position, velocity, acceleration;
  float mass;
  
  Particle(float x, float y) {
    acceleration = new PVector(0, 0);
    velocity = new PVector(0, 0);
    position = new PVector(x, y);
    mass = 1; // Let's do something better here!
  }

  void applyForce(PVector force) {
    PVector f = force.copy();
    f.div(this.mass);
    acceleration.add(f);
  }

  // Method to update position
  void update() {
    velocity.mult(0.99);

    velocity.add(acceleration);
    position.add(velocity);
    acceleration.mult(0);
  }

  // Method to display
  void show() {
    stroke(255);
    strokeWeight(2);
    fill(45, 197, 244);
    circle(position.x, position.y, 64);
  }
}
