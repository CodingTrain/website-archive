// Variables in p5.js (mouseX, mouseY)
// Code! Programming with p5.js
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/beginners/p5js/2.1-mousex-mousey.html
// https://youtu.be/7A5tKW9HGoM
// https://editor.p5js.org/codingtrain/sketches/IeblvUQrf

function setup() {
  createCanvas(800, 600);
  background(0);
}

function draw() {
  noStroke();
  fill(255, 50);
  circle(mouseX, mouseY, 24);
}

function mousePressed() {
  background(0);
}
