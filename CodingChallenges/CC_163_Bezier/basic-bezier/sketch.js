// Bezier (Basic)
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

function setup() {
  createCanvas(600, 600);
}

function draw() {
  background(0);

  stroke(255);
  strokeWeight(24);
  point(0, 300);
  point(mouseX, mouseY);
  point(400, 400);
  point(600, 300);

  strokeWeight(4);
  noFill();
  bezier(0, 300, mouseX, mouseY, 400, 400, 600, 300);

  strokeWeight(2);
  line(0, 300, mouseX, mouseY);
  line(400, 400, 600, 300);
}
