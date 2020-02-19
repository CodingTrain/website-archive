// Vector Math
// The Nature of Code
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/learning/nature-of-code/1.2-vector-math.html
// https://editor.p5js.org/codingtrain/sketches/GGn5cd-z

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
