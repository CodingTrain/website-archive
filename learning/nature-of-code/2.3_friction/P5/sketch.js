// Friction Force
// The Nature of Code
// The Coding Train / Daniel Shiffman
// https://youtu.be/9IQEM_Ijklg
// https://thecodingtrain.com/learning/nature-of-code/2.3-friction.html
// https://editor.p5js.org/codingtrain/sketches/zcTpMCpA

let movers = [];
let mu = 0.1;

function setup() {
  createCanvas(400, 400);
  for (let i = 0; i < 10; i++) {
    movers[i] = new Mover(random(width), 200, random(1, 8));
  }
}

function draw() {
  background(0);

  for (let mover of movers) {
    if (mouseIsPressed) {
      let wind = createVector(0.1, 0);
      mover.applyForce(wind);
    }
    let gravity = createVector(0, 0.2);
    let weight = p5.Vector.mult(gravity, mover.mass);
    mover.applyForce(weight);
    mover.friction();
    mover.update();
    mover.edges();
    mover.show();
  }
}
