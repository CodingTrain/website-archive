// Arrays and Loops
// Code! Programming with p5.js
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/beginners/p5js/7.2-arrays-loops.html
// https://youtu.be/RXWO3mFuW-I
// https://editor.p5js.org/codingtrain/sketches/ZnPevren

var nums = [100, 25, 46, 72];

function setup() {
  createCanvas(500, 400);
}

function draw() {
  background(0);

  for (var i = 0; i < 4; i++) {
    stroke(255);
    fill(51);
    ellipse(i * 100 + 100, 200, nums[i], nums[i]);
  }

  // ellipse(100, 200, nums[0], nums[0]);
  // ellipse(200, 200, nums[1], nums[1]);
  // ellipse(300, 200, nums[2], nums[2]);
  // ellipse(400, 200, nums[3], nums[3]);
}
