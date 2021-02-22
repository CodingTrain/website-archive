// Spring Forces (Simple Spring)
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/160-spring-forces.html
// https://youtu.be/Rr-5HiXquhw

// Simple Spring: https://editor.p5js.org/codingtrain/sketches/dcd6-2mWa
// Spring Vector: https://editor.p5js.org/codingtrain/sketches/_A2pm_SSg
// Spring OOP: https://editor.p5js.org/codingtrain/sketches/9BAoEn4Po
// Soft Spring: https://editor.p5js.org/codingtrain/sketches/S5dY7qjxP

let y = 250;
let velocity = 0;
let restLength = 200;
let k = 0.01;

function setup() {
  createCanvas(600, 400);
}

function draw() {
  background(112, 50, 126);
  noStroke();
  fill(45, 197, 244);
  circle(300, y, 64);

  let x = y - restLength;
  let force = -k * x;

  // F = A
  velocity += force;
  y += velocity;

  velocity *= 0.99;
}
