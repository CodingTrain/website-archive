// Variables in p5.js (mouseX, mouseY)
// Code! Programming with p5.js
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/beginners/p5js/2.1-mousex-mousey.html
// https://youtu.be/RnS0YNuLfQQ
// https://editor.p5js.org/codingtrain/sketches/Nnn1OpIg

function setup() {
  createCanvas(600, 400);
  // background
  background(250, 250, 100);
}

function draw() {
  // ellipse
  noStroke();
  fill(250, 200, 200, 50);
  ellipse(mouseX, mouseY, 25, 25);
}

function mousePressed() {
  background(250, 250, 100);
}
