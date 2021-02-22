// Spring Forces (Spring OOP)
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/160-spring-forces.html
// https://youtu.be/Rr-5HiXquhw

// Simple Spring: https://editor.p5js.org/codingtrain/sketches/dcd6-2mWa
// Spring Vector: https://editor.p5js.org/codingtrain/sketches/_A2pm_SSg
// Spring OOP: https://editor.p5js.org/codingtrain/sketches/9BAoEn4Po
// Soft Spring: https://editor.p5js.org/codingtrain/sketches/S5dY7qjxP

let bob;
let anchor;
let spring;

let gravity;

function setup() {
  createCanvas(600, 400);
  bob = new Particle(400, 190);
  anchor = new Particle(200, 210);
  spring = new Spring(0.01, 200, bob, anchor);
  gravity = createVector(0, 0.1);
}

function draw() {
  background(112, 50, 126);
  spring.show();
  spring.update();

  bob.show();
  bob.update();
  anchor.show();
  anchor.update();

  if (mouseIsPressed) {
    bob.position.set(mouseX, mouseY);
    bob.velocity.set(0, 0);
  }
}
