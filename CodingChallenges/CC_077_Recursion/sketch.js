// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain

// Recursion
// Edited Video: https://www.youtube.com/watch?v=jPsZwrV9ld0

function setup() {
  createCanvas(600, 600);
}

function draw() {
  background(0);
  stroke(255);
  noFill();
  drawCircle(300, 200, 600);
  noLoop();
}

function drawCircle(x, y, d) {
  ellipse(x, y, d);
  if (d > 2) {
    let newD = d * 0.25;
    drawCircle(x + newD, y, newD);
    drawCircle(x - newD, y, newD);
    //drawCircle(x, y + d * 0.5, d * 0.5);
  }
}
