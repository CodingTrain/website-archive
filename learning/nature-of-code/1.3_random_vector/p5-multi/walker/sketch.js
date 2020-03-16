// A Random Vector
// The Nature of Code
// The Coding Train / Daniel Shiffman
// https://youtu.be/jupjuq9Jl-M
// https://thecodingtrain.com/learning/nature-of-code/1.3-random-vector.html

// Random Vector: https://editor.p5js.org/codingtrain/sketches/qHKMdpRR
// Walker: https://editor.p5js.org/codingtrain/sketches/_HHLfcGx

let walker;

function setup() {
  createCanvas(400, 400);
  walker = new Walker(200, 200);
}

function draw() {
  background(0);
  walker.update();
  walker.show();
}
