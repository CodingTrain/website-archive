// The Bouncing Ball
// Code! Programming with p5.js
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/beginners/p5js/3.2-bouncing-ball.html
// https://youtu.be/LO3Awjn_gyU
// https://editor.p5js.org/codingtrain/sketches/Xm4cmQvU

// println() is no longer part of p5.js use console.log(). For more info: https://p5js.org/reference/#/console/log

var x = 0;
var speed = 3;

function setup() {
  createCanvas(600, 400);
}

function draw() {
  background(0);
  stroke(255);
  strokeWeight(4);
  noFill();
  ellipse(x, 200, 100, 100);

  if (x > width) {
    speed = -3;
  }

  x = x + speed;
}
