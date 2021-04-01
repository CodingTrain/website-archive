// Particle System Inheritance
// The Nature of Code
// The Coding Train / Daniel Shiffman
// https://youtu.be/44RSr49m6LU
// https://thecodingtrain.com/learning/nature-of-code/4.3-particle-inheritance.html
// https://editor.p5js.org/codingtrain/sketches/vYgv7Xagg

let emitters = [];

function mousePressed() {
  emitters.push(new Emitter(mouseX, mouseY));
}

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(0);
  for (let emitter of emitters) {
    emitter.emit(1);
    emitter.show();
    emitter.update();
  }
}
