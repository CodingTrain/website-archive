// Drag Force
// The Nature of Code
// The Coding Train / Daniel Shiffman
// https://youtu.be/DxFDgOYEoy8
// https://thecodingtrain.com/learning/nature-of-code/2.4-drag.html
// https://editor.p5js.org/codingtrain/sketches/5V8nSBOS

let movers = [];
let mu = 0.1;
let dragC = 0.2;

function setup() {
  createCanvas(400, 400);
  for (let i = 0; i < 10; i++) {
    movers[i] = new Mover(random(width), 10, random(1, 8));
  }
}

function draw() {
  background(0);

  fill(255, 125);
  noStroke();
  rect(0, height / 2, width, height / 2);

  for (let mover of movers) {
    if (mouseIsPressed) {
      let wind = createVector(0.1, 0);
      mover.applyForce(wind);
    }
    let gravity = createVector(0, 0.2);
    let weight = p5.Vector.mult(gravity, mover.mass);
    mover.applyForce(weight);

    if (mover.pos.y > height / 2) {
      mover.drag(dragC);
    }
    mover.update();
    mover.edges();
    mover.show();
  }
}
