// Spring Forces (Soft Spring)
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/160-spring-forces.html
// https://youtu.be/Rr-5HiXquhw

// Simple Spring: https://editor.p5js.org/codingtrain/sketches/dcd6-2mWa
// Spring Vector: https://editor.p5js.org/codingtrain/sketches/_A2pm_SSg
// Spring OOP: https://editor.p5js.org/codingtrain/sketches/9BAoEn4Po
// Soft Spring: https://editor.p5js.org/codingtrain/sketches/S5dY7qjxP

let particles = [];
let springs = [];
let spacing = 50;
let k = 0.1;

let gravity;

function setup() {
  createCanvas(windowWidth, windowHeight);
  for (let i = 0; i < 10; i++) {
    particles[i] = new Particle(width / 2, i * spacing);
    if (i !== 0) {
      let a = particles[i];
      let b = particles[i - 1];
      let spring = new Spring(k, spacing, a, b);
      springs.push(spring);
    }
  }

  particles[0].locked = true;

  gravity = createVector(0, 0.1);
}

function draw() {
  background(112, 50, 126);

  for (let s of springs) {
    s.update();
    //s.show();
  }

  noFill();
  stroke(252, 238, 33);
  strokeWeight(8);
  beginShape();
  let head = particles[0];
  curveVertex(head.position.x, head.position.y);
  for (let p of particles) {
    p.applyForce(gravity);
    p.update();
    curveVertex(p.position.x, p.position.y);
    //p.show();
  }
  let tail = particles[particles.length - 1];
  curveVertex(tail.position.x, tail.position.y);
  endShape();

  fill(45, 197, 244);
  ellipse(tail.position.x, tail.position.y, 64);

  if (mouseIsPressed) {
    tail.position.set(mouseX, mouseY);
    tail.velocity.set(0, 0);
  }
}
