// Graphing 1D Perlin Noise (1D Noise Graph)
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/learning/noise/0.4-graphing-1d.html
// https://youtu.be/y7sgcFhk6ZM

// Adding Y-Axis: https://editor.p5js.org/codingtrain/sketches/nCYG2SCNq
// Noise Graph: https://editor.p5js.org/codingtrain/sketches/EZeHXBhei
// Noisy Sin: https://editor.p5js.org/codingtrain/sketches/M_kuAXwV2

// This example has been updated to use es6 syntax. To learn more about es6 visit: https://thecodingtrain.com/Tutorials/16-javascript-es6

let inc = 0.01;
let start = 0;

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(51);

  stroke(255);
  noFill();
  beginShape();
  let xoff = start;
  for (let x = 0; x < width; x++) {
    stroke(255);
    // let y = random(height);
    let y = noise(xoff) * height;
    vertex(x, y);

    xoff += inc;
  }
  endShape();

  start += inc;

  //noLoop();
}
