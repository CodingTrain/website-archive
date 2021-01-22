// noise() vs random()
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/learning/noise/0.3-noise-vs-random.html
// https://youtu.be/YcdldZ1E9gU
// https://editor.p5js.org/codingtrain/sketches/u6Te_XMF5

// This example has been updated to use es6 syntax. To learn more about es6 visit: https://thecodingtrain.com/Tutorials/16-javascript-es6

let xoff = 0;

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(51);
  // let x = random(width);

  let x = map(noise(xoff), 0, 1, 0, width);

  xoff += 0.01;

  ellipse(x, 200, 24, 24);
}
