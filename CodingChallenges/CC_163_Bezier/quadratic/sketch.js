// Bezier (Quadratic)
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
  createCanvas(600, 600);
  p0 = createVector(0, 300);
  p1 = createVector(300, 0);
  p2 = createVector(600, 300);
}

function draw() {
  background(0);
  stroke(255);
  strokeWeight(4);
  // line(p0.x, p0.y, p1.x, p1.y);

  p1.x = mouseX;
  p1.y = mouseY;

  let delta = 0.05;
  colorMode(HSB);

  noFill();
  for (let t = 0; t <= 1.00001; t += delta) {
    let x1 = lerp(p0.x, p1.x, t);
    let y1 = lerp(p0.y, p1.y, t);
    let x2 = lerp(p1.x, p2.x, t);
    let y2 = lerp(p1.y, p2.y, t);
    stroke(t * 360, 255, 255);
    line(x1, y1, x2, y2);
    let x = lerp(x1, x2, t);
    let y = lerp(y1, y2, t);
  }
}
