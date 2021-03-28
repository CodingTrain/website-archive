// Spring Forces (Spring Vector)
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/160-spring-forces.html
// https://youtu.be/Rr-5HiXquhw

// Simple Spring: https://editor.p5js.org/codingtrain/sketches/dcd6-2mWa
// Spring Vector: https://editor.p5js.org/codingtrain/sketches/_A2pm_SSg
// Spring OOP: https://editor.p5js.org/codingtrain/sketches/9BAoEn4Po
// Soft Spring: https://editor.p5js.org/codingtrain/sketches/S5dY7qjxP

let bob;
let anchor;
let velocity;
let restLength = 200;
let k = 0.01;
let gravity;

function setup() {
  createCanvas(600, 400);
  bob = createVector(350, 0);
  anchor = createVector(300, 0);
  velocity = createVector(0, 0);
  gravity = createVector(0, 0.1);
}

function draw() {
  background(112, 50, 126);
  strokeWeight(4);
  stroke(255);
  line(anchor.x, anchor.y, bob.x, bob.y);
  fill(45, 197, 244);
  circle(anchor.x, anchor.y, 32);
  circle(bob.x, bob.y, 64);

  if (mouseIsPressed) {
    bob.x = mouseX;
    bob.y = mouseY;
    velocity.set(0, 0);
  }

  let force = p5.Vector.sub(bob, anchor);
  let x = force.mag() - restLength;
  force.normalize();
  force.mult(-1 * k * x);

  // F = A
  velocity.add(force);
  velocity.add(gravity);
  bob.add(velocity);
  velocity.mult(0.99);
}
