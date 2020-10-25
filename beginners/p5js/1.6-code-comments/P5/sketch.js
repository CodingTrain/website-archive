// Code Comments
// Code! Programming with p5.js
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/beginners/p5js/1.6-code-comments.html
// https://youtu.be/xJcrPJuem5Q
// https://editor.p5js.org/codingtrain/sketches/H1mj3SwD7

// Code Example
// by Daniel Shiffman
// The Coding Train
// http://thecodingtrain.com
// This code is based on everything I learned from
// Lauren McCarthy (creator of p5)
// and Cassie Tarakajian (creator of p5 web editor)

function setup() {
  createCanvas(400, 300);
  print('hello');
}

function draw() {
  background(100);
  rectMode(CENTER);

  // This is the green rectangle in the center
  fill(0, 255, 0);
  stroke(0, 0, 255);
  strokeWeight(4);
  rect(200, 150, 150, 150);

  // Red Circle
  // Later I want to make this circle animate
  fill(255, 0, 0, 175);
  noStroke();
  ellipse(150, 250, 100, 75);
}
