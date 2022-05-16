// Bezier (Formula)
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/163-bezier.html
// https://youtu.be/zUgsYaUQNBk

// Basic: https://editor.p5js.org/codingtrain/sketches/Z53a719cQ
// Editor by Simon Tiger: https://editor.p5js.org/codingtrain/sketches/_R7RgtGfA
// bezierVertex: https://editor.p5js.org/codingtrain/sketches/O3_cLiOaw
// Time Table Cardioid with Bezier: https://editor.p5js.org/codingtrain/sketches/kZ8dpklQg
// Quadratic: https://editor.p5js.org/codingtrain/sketches/fJIMDmHcE
// Cubic: https://editor.p5js.org/codingtrain/sketches/S1Pt8lol1
// Bezier with Formula: https://editor.p5js.org/codingtrain/sketches/0XOLNHbvC

let p0, p1;

function setup() {
  createCanvas(640, 360);
  p0 = new Particle(0, height / 2);
  p1 = new Particle(width / 4, 0);
  p2 = new Particle((3 * width) / 4, height);
  p3 = new Particle(width, height / 2);
}

function draw() {
  background(0);
  stroke(255);

  // p0.update();
  // p1.update();
  // p2.update();
  // p3.update();

  let delta = 0.03;
  colorMode(HSB);

  noFill();
  for (let t = 0; t <= 1.00001; t += delta) {
    stroke(t * 360, 255, 255, 0.5);
    strokeWeight(2);
    // stroke(255, 0.5);
    // line(x1, y1, x2, y2);
    let v = cubic(p0, p1, p2, p3, t);
  }

  strokeWeight(8);
  stroke(255);
  bezier(p0.x, p0.y, p1.x, p1.y, p2.x, p2.y, p3.x, p3.y);
}

function cubic(p0, p1, p2, p3, t) {
  let x =
    pow(1 - t, 3) * p0.x +
    3 * pow(1 - t, 2) * p1.x +
    3 * pow(1 - t, 2) * pow(t, 2) * p2.x +
    pow(t, 3) * p3.x;
  let y =
    pow(1 - t, 3) * p0.y +
    3 * pow(1 - t, 2) * p1.y +
    3 * pow(1 - t, 2) * pow(t, 2) * p2.y +
    pow(t, 3) * p3.x;
  return createVector(x, y);
}
