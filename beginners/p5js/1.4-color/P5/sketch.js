// Color
// Code! Programming with p5.js
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/beginners/p5js/1.4-color.html
// https://youtu.be/riiJTF5-N7c
// https://editor.p5js.org/codingtrain/sketches/rJ9MQSwvm

function setup() {
  createCanvas(400, 300);
}

function draw() {
  background(100);

  rectMode(CENTER);
  strokeWeight(4);
  stroke(0, 0, 255);
  fill(0, 255, 0);
  rect(200, 150, 150, 150);

  noStroke();
  fill(255, 0, 0, 175);
  ellipse(150, 250, 100, 75);
}
