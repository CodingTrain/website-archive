// Spring Forces (Spring Vector Port)
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/160-spring-forces.html
// https://youtu.be/Rr-5HiXquhw

// Simple Spring: https://editor.p5js.org/codingtrain/sketches/dcd6-2mWa
// Spring Vector: https://editor.p5js.org/codingtrain/sketches/_A2pm_SSg
// Spring OOP: https://editor.p5js.org/codingtrain/sketches/9BAoEn4Po
// Soft Spring: https://editor.p5js.org/codingtrain/sketches/S5dY7qjxP

PVector bob;
PVector anchor;
PVector velocity;
float restLength = 200;
float k = 0.01;
PVector gravity;

void setup() {
  size(600, 400);
  bob = new PVector(350, 0);
  anchor = new PVector(300, 0);
  velocity = new PVector(0, 0);
  gravity = new PVector(0, 0.1);
}

void draw() {
  background(112, 50, 126);
  strokeWeight(4);
  stroke(255);
  line(anchor.x, anchor.y, bob.x, bob.y);
  fill(45, 197, 244);
  circle(anchor.x, anchor.y, 32);
  circle(bob.x, bob.y, 64);

  if (mousePressed) {
    bob.x = mouseX;
    bob.y = mouseY;
    velocity.set(0, 0);
  }

  PVector force = PVector.sub(bob, anchor);
  float x = force.mag() - restLength;
  force.normalize();
  force.mult(-1 * k * x);

  // F = A
  velocity.add(force);
  velocity.add(gravity);
  bob.add(velocity);
  velocity.mult(0.99);
}
