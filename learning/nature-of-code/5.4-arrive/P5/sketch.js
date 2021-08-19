// Arrive
// The Nature of Code
// The Coding Train / Daniel Shiffman
// https://youtu.be/OxHJ-o_bbzs
// https://thecodingtrain.com/learning/nature-of-code/5.4-arrive.html
// https://editor.p5js.org/codingtrain/sketches/1eUnUQnwB

let vehicle;

function setup() {
  createCanvas(400, 400);
  vehicle = new Vehicle(100, 100);
}

function draw() {
  background(0);

  let target = createVector(mouseX, mouseY);
  fill(255, 0, 0);
  noStroke();
  ellipse(target.x, target.y, 32);

  let steering = vehicle.arrive(target);
  vehicle.applyForce(steering);
  vehicle.update();
  vehicle.show();
}
