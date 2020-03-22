// Acceleration Vector
// The Nature of Code
// The Coding Train / Daniel Shiffman
// https://youtu.be/T84AWnntxZA
// https://thecodingtrain.com/learning/nature-of-code/1.6-acceleration-vector.html
// https://editor.p5js.org/codingtrain/sketches/OjCfrdWX

let mover;

function setup() {
  createCanvas(400, 400);
  mover = new Mover(200, 200);
}

function draw() {
  background(0);
  mover.update();
  mover.show();
}
