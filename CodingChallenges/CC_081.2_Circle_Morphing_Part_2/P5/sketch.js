// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain

// Circle Morphing Part 2
// Edited Video: Coming Soon

let cirPath = [];
let spacing = 2;

function polarToCartesian(r, angle) {
  return createVector(r * cos(angle), r * sin(angle));
}

function setup() {
  createCanvas(400, 400);
  angleMode(DEGREES);
  let radius = 200;
  let i = 0;
  for (let a = 0; a < 360; a += spacing) {
    let cv = polarToCartesian(radius, a);
    cv.active = true;
    if (a % 120 == 0) {
      cv.fixed = true;
    }
    cirPath.push(cv);
  }
}

function draw() {
  background(220);
  translate(width / 2, height / 2);
  rotate(30);
  stroke(0);
  strokeWeight(2);
  noFill();
  beginShape();
  for (let i = 0; i < cirPath.length; i++) {
    let v = cirPath[i];
    if (v.active) {
      vertex(v.x, v.y);
    }
  }
  endShape(CLOSE);

  let activeList = [];
  for (let i = 0; i < cirPath.length; i++) {
    let v = cirPath[i];
    if (v.active && !v.fixed) {
      activeList.push(v);
    }
  }

  let index = 0; //floor(random(activeList.length));
  let v = activeList[index];
  if (v) {
    v.active = false;
  }
}
