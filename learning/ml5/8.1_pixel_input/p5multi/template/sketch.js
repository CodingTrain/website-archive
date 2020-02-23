// ml5.js: Train a Neural Network with Pixels as Input - Template
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/learning/ml5/8.1-pixels-input.html
// https://youtu.be/UaKab6h9Z0I

// Main Sketch: https://editor.p5js.org/codingtrain/sketches/rkonHpec2

// Other sketches shown in video:
// Template: https://editor.p5js.org/codingtrain/sketches/ARYvi6amN
// Regression: https://editor.p5js.org/codingtrain/sketches/tOJKHkPy-

// The video and pixel scale
let video;
let videoSize = 10;
let ready = false;

function setup() {
  createCanvas(400, 400);
  video = createCapture(VIDEO, videoReady);
  video.size(videoSize, videoSize);
  video.hide();
}

// Video is ready!
function videoReady() {
  ready = true;
}

function draw() {
  background(0);
  if (ready) {
    // Render the low-res image
    let w = width / videoSize;
    video.loadPixels();
    for (let x = 0; x < video.width; x++) {
      for (let y = 0; y < video.height; y++) {
        let index = (x + y * video.width) * 4;
        let r = video.pixels[index + 0];
        let g = video.pixels[index + 1];
        let b = video.pixels[index + 2];
        noStroke();
        fill(r, g, b);
        rect(x * w, y * w, w, w);
      }
    }
  }
}

// Add an example
function addExample() {}

function trainModel() {}

// Training is done!
function finishedTraining() {}

// Predict
function predict() {}
