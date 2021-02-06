// Polar Coordinates (Circular Shape)
// The Nature of Code
// The Coding Train / Daniel Shiffman
// https://youtu.be/O5wjXoFrau4
// https://thecodingtrain.com/learning/nature-of-code/3.4-polar-coordinates.html

// Basic Polar Coordinates: https://editor.p5js.org/codingtrain/sketches/DHetsOfgz
// Spiral: https://editor.p5js.org/codingtrain/sketches/BnJ_4U4cr
// Random Trail: https://editor.p5js.org/codingtrain/sketches/WqK-qD1vU
// Circular Shape: https://editor.p5js.org/codingtrain/sketches/s10TQXDZv

let angle = 0;
let r = 150;

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(0);
  translate(200, 200);
  stroke(255);
  strokeWeight(4);
  noFill();
  // circle(0, 0, r * 2);

  // let increment = map(mouseX, 0, width, PI, 0.01);
  let increment = 0.1;
  noLoop();
  beginShape();
  for (let a = 0; a < TWO_PI; a += increment) {
    let r1 = r + random(-50, 10);
    let x = r1 * cos(a);
    let y = r1 * sin(a);
    vertex(x, y);
  }
  endShape(CLOSE);
}
