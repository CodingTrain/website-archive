// Introduction to Conditional Statements
// Code! Programming with p5.js
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/beginners/p5js/3.1-conditional-statements.html
// https://youtu.be/1Osb_iGDdjk
// https://editor.p5js.org/codingtrain/sketches/z_yjYIha

function setup() {
  createCanvas(600, 400);
}

function draw() {
  background(0);

  stroke(255);
  strokeWeight(4);
  noFill();

  if (mouseX > 300) {
    fill(255, 0, 200);
  }

  ellipse(300, 200, 100, 100);
}
