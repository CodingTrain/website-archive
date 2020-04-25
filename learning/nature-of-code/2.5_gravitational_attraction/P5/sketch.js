// Gravitational Attraction
// The Nature of Code
// The Coding Train / Daniel Shiffman
// https://youtu.be/EpgB3cNhKPM
// https://thecodingtrain.com/learning/nature-of-code/2.5-gravitational-attraction.html
// https://editor.p5js.org/codingtrain/sketches/MkLraatd

let movers = [];
let attractor;

function setup() {
  createCanvas(600, 600);
  for (let i = 0; i < 10; i++) {
    let x = random(width);
    let y = random(height);
    let m = random(50, 150);
    movers[i] = new Mover(x, y, m);
  }
  attractor = new Attractor(width / 2, height / 2, 100);
  background(0);
}

function draw() {
  background(0);
  for (let mover of movers) {
    mover.update();
    mover.show();
    attractor.attract(mover);
  }
  if (mouseIsPressed) {
    attractor.pos.x = mouseX;
    attractor.pos.y = mouseY;
  }
  attractor.show();
}
