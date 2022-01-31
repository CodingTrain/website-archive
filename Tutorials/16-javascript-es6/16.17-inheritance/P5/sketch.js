// Inheritance in JavaScript
// The Coding Train / Daniel Shiffman
// https://youtu.be/MfxBfRD0FVU
// https://thecodingtrain.com/Tutorials/16-javascript-es6/16.17-inheritance.html
// https://editor.p5js.org/codingtrain/sketches/52LIIRRCa

let p1, p2;
function setup() {
  createCanvas(600, 600);
  p1 = new Particle(300, 300);
  p2 = new Confetti(300, 300);
}

function draw() {
  background(0);
  p1.update();
  p1.show();
  p2.update();
  p2.show();
}
