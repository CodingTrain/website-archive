// ml5.js: Classifying Drawings with DoodleNet (Template)
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/learning/ml5/9.1-doodlenet.html
// https://youtu.be/ABN_DWnM5GQ

// Template: https://editor.p5js.org/codingtrain/sketches/AHgkwgPdc
// Mouse: https://editor.p5js.org/codingtrain/sketches/6LLnGY1VY
// Video: https://editor.p5js.org/codingtrain/sketches/fxFKOn3il

let clearButton;
let canvas;

function setup() {
  canvas = createCanvas(400, 400);
  clearButton = createButton('clear');
  clearButton.mousePressed(clearCanvas);
  background(255);
}

function clearCanvas() {
  background(255);
}

function draw() {
  if (mouseIsPressed) {
    strokeWeight(8);
    line(mouseX, mouseY, pmouseX, pmouseY);
  }
}
