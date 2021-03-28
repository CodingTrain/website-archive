// Particle System Simulation
// The Nature of Code
// The Coding Train / Daniel Shiffman
// https://youtu.be/syR0klfncCk
// https://thecodingtrain.com/learning/nature-of-code/4.1-particle-system-simulation.html
// https://editor.p5js.org/codingtrain/sketches/QRzgzQLnQ

let particles = [];

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(0);
  for (let i = 0; i < 3; i++) {
    particles.push(new Particle(200, 20));
  }

  for (let particle of particles) {
    let gravity = createVector(0, 0.2);
    particle.applyForce(gravity);
    particle.update();
    particle.show();
  }

  for (let i = particles.length - 1; i >= 0; i--) {
    if (particles[i].finished()) {
      particles.splice(i, 1);
    }
  }
}
