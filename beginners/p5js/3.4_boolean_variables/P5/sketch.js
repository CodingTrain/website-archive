// Boolean Variables
// Code! Programming with p5.js
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/beginners/p5js/3.4-boolean-variables.html
// https://youtu.be/Rk-_syQluvc
// https://editor.p5js.org/codingtrain/sketches/yzBpV0CI

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
