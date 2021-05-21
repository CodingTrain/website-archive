// if/else background
// Mouse Learning Talk
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/more/talks/mouse-learning.html

// if/else background: https://editor.p5js.org/codingtrain/sketches/yFaE6qQyO
// mouse learns: https://editor.p5js.org/codingtrain/sketches/kWjDFS51O

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(0);

  if (mouseX > 200) {
    background(255, 0, 0);
  } else {
    background(0, 0, 255);
  }

  strokeWeight(8);
  stroke(255);
  line(200, 0, 200, height);
}
