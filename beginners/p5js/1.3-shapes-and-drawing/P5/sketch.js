// Shapes & Drawing
// Code! Programming with p5.js
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/beginners/p5js/1.3-shapes-and-drawing.html
// https://youtu.be/c3TeLi6Ns1E
// https://editor.p5js.org/codingtrain/sketches/HJ1WjEPwQ

function setup() {
  createCanvas(400, 300);
}

function draw() {
  background(220, 0, 200);

  line(0, 50, 400, 300);
  rectMode(CENTER);
  rect(200, 150, 150, 150);
}
