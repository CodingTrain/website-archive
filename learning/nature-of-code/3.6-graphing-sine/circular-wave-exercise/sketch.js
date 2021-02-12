// Graphing Sine Wave (Circular Wave Exercise)
// The Nature of Code
// The Coding Train / Daniel Shiffman
// https://youtu.be/JLAc9hMtcxk
// https://thecodingtrain.com/learning/nature-of-code/3.6-graphing-sine.html

// Sine Wave Graph Exercise: https://editor.p5js.org/codingtrain/sketches/EIbEYLTaZ
// Playing With Period: https://editor.p5js.org/codingtrain/sketches/SbRC-G0lU
// Graphing Wave: https://editor.p5js.org/codingtrain/sketches/c_S9jiXz-
// Circular Wave Exercise: https://editor.p5js.org/codingtrain/sketches/mOm2Is7ba

let angle = 0;
let r;
let phase = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  r = width / 3;
}

function draw() {
  background(0);
  translate(width / 2, height / 2);
  stroke(255);
  strokeWeight(8);
  fill(50);
  // circle(0, 0, r * 2);

  // let increment = map(mouseX, 0, width, PI, 0.01);
  let increment = TWO_PI / 32;
  beginShape();
  for (let a = 0; a < TWO_PI; a += increment) {
    let r1 = r + sin(a * 10 + phase) * 50;
    let x = r1 * cos(a);
    let y = r1 * sin(a);
    curveVertex(x, y);
  }
  endShape(CLOSE);
  phase += 0.05;
}
