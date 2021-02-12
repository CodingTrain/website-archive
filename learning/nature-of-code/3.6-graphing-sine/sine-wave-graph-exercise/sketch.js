// Graphing Sine Wave (Sine Wave Graph Exercise)
// The Nature of Code
// The Coding Train / Daniel Shiffman
// https://youtu.be/JLAc9hMtcxk
// https://thecodingtrain.com/learning/nature-of-code/3.6-graphing-sine.html

// Sine Wave Graph Exercise: https://editor.p5js.org/codingtrain/sketches/EIbEYLTaZ
// Playing With Period: https://editor.p5js.org/codingtrain/sketches/SbRC-G0lU
// Graphing Wave: https://editor.p5js.org/codingtrain/sketches/c_S9jiXz-
// Circular Wave Exercise: https://editor.p5js.org/codingtrain/sketches/mOm2Is7ba

let r = 4;

function setup() {
  createCanvas(600, 400);
}

function draw() {
  background(0);
  translate(300, 200);
  let total = floor(width / (r * 2));
  noFill();
  stroke(252, 238, 33);
  strokeWeight(8);
  beginShape();
  for (let i = 0; i < total + 1; i++) {
    let angle = map(i, 0, total, 0, TWO_PI);
    let y = map(sin(angle), -1, 1, -100, 100);
    let x = map(i, 0, total + 1, -300, 300);
    vertex(x, y);
  }
  endShape();
}
