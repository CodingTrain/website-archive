// The random() Function
// Code! Programming with p5.js
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/beginners/p5js/beginners/p5js/2.5-random.html
// https://youtu.be/nicMAoW6u1g
// https://editor.p5js.org/codingtrain/sketches/4gD7Btgi

var spot = {
  x: 100,
  y: 50
};

var col = {
  r: 255,
  g: 0,
  b: 0
};
function setup() {
  createCanvas(600, 400);
  background(0);
}

function draw() {
  col.r = random(100, 255);
  col.g = 0;
  col.b = random(100, 190);

  spot.x = random(0, width);
  spot.y = random(0, height);
  noStroke();
  fill(col.r, col.g, col.b, 100);
  ellipse(spot.x, spot.y, 24, 24);
}
