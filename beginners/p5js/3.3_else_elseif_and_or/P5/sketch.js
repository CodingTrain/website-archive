// Else and Else If, AND and OR
// Code! Programming with p5.js
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/beginners/p5js/3.3-else-elseif-and-or.html
// https://youtu.be/r2S7j54I68c
// https://editor.p5js.org/codingtrain/sketches/In-bIB8w

function setup() {
  createCanvas(600, 400);
}

function draw() {
  background(0);

  stroke(255);
  strokeWeight(4);
  noFill();

  // if (mouseX > 250) {
  //   ellipse(300, 200, 100, 100);
  // } else if (mouseX > 150) {
  //   rect(300, 200, 100, 100);
  // } else if (mouseX > 50) {
  //   line(0, 0, width, height);
  // } else {
  //   point(300, 200);
  // }

  if (mouseX > 300 && mouseX < 400) {
    fill(255, 0, 200);
  }
  rect(300, 200, 100, 100);
}
