// Scalar Projection (Scalar Projection)
// The Nature of Code
// The Coding Train / Daniel Shiffman
// https://youtu.be/DHPfoqiE4yQ
// https://thecodingtrain.com/learning/nature-of-code/5.6-dot-product.html

// Angle Between: https://editor.p5js.org/codingtrain/sketches/ORP5Yx7JX
// Scalar Projection: https://editor.p5js.org/codingtrain/sketches/c4jmHLFQI

let path;

function setup() {
  createCanvas(400, 400);
  path = createVector(200, 60);
}

function vectorProjection(a, b) {
  let bCopy = b.copy().normalize();
  let sp = a.dot(bCopy);
  bCopy.mult(sp);
  return bCopy;
}

function draw() {
  background(0);
  strokeWeight(4);
  stroke(255);
  let pos = createVector(100, 200);

  let mouse = createVector(mouseX, mouseY);
  let a = p5.Vector.sub(mouse, pos);

  // line(pos.x, pos.y, pos.x + a.x, pos.y + a.y);
  line(pos.x, pos.y, pos.x + path.x, pos.y + path.y);

  let v = vectorProjection(a, path);

  strokeWeight(8);
  stroke(0, 0, 255);
  //line(pos.x, pos.y, pos.x + v.x, pos.y + v.y);

  strokeWeight(1);
  stroke(255);
  // line(pos.x + a.x, pos.y + a.y, v.x + pos.x, v.y + pos.y);

  fill(0, 255, 0);
  noStroke();
  circle(pos.x + a.x, pos.y + a.y, 16);

  fill(255, 0, 0);
  noStroke();
  circle(v.x + pos.x, v.y + pos.y, 16);

  fill(0, 255, 0);
  noStroke();
  // circle(pos.x, pos.y, 16);
}
