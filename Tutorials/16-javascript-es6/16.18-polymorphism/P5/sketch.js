// Polymorphism in JavaScript
// The Coding Train / Daniel Shiffman
// https://youtu.be/8a5BkwuZRK0
// https://thecodingtrain.com/Tutorials/16-javascript-es6/16.18-polymorphism.html
// https://editor.p5js.org/codingtrain/sketches/7MhdISflX

let particles = [];

function setup() {
  createCanvas(600, 600);
  for (let i = 0; i < 10; i++) {
    if (random(1) < 0.5) {
      particles[i] = new Particle(300, 300);
    } else {
      particles[i] = new Confetti(300, 300);
    }
  }
}

function draw() {
  background(0);
  for (let p of particles) {
    p.update();
    p.show();
  }
}
