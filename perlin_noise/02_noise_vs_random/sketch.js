// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/YcdldZ1E9gU

var xoff = 0;
var inc = 0.01;

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(51);
  xoff += inc;

  //var x = random(width);
  var x = map(noise(xoff), 0, 1, 0, width);
  fill(255);
  ellipse(x, 200, 24, 24);
}
