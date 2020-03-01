// ml5.js: Train a Neural Network with Pixels as Input
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/learning/ml5/8.1-pixels-input.html
// https://youtu.be/UaKab6h9Z0I

// Main Sketch: https://editor.p5js.org/codingtrain/sketches/rkonHpec2

// Other sketches shown in video:
// Template: https://editor.p5js.org/codingtrain/sketches/ARYvi6amN
// Regression: https://editor.p5js.org/codingtrain/sketches/tOJKHkPy-

let video;
let videoSize = 10;
let ready = false;

let pixelBrain;
let label = '';

function setup() {
  createCanvas(400, 400);
  video = createCapture(VIDEO, videoReady);
  video.size(videoSize, videoSize);
  video.hide();

  let options = {
    inputs: videoSize * videoSize * 3,
    outputs: 3,
    task: 'classification',
    debug: true
  };
  pixelBrain = ml5.neuralNetwork(options);
}

function loaded() {
  pixelBrain.train({ epochs: 50 }, finishedTraining);
}

function finishedTraining() {
  console.log('training complete');
  classifyVideo();
}

function classifyVideo() {
  let inputs = [];
  video.loadPixels();
  for (let i = 0; i < video.pixels.length; i += 4) {
    let r = video.pixels[i + 0] / 255;
    let g = video.pixels[i + 1] / 255;
    let b = video.pixels[i + 2] / 255;
    inputs.push(r, g, b);
  }
  pixelBrain.classify(inputs, gotResults);
}

function gotResults(error, results) {
  if (error) {
    return;
  }
  label = results[0].label;
  classifyVideo();
}

function keyPressed() {
  if (key == 't') {
    pixelBrain.train({ epochs: 50 }, finishedTraining);
  } else if (key == 's') {
    pixelBrain.saveData();
  } else {
    addExample(key);
  }
}

function addExample(label) {
  let inputs = [];
  video.loadPixels();
  for (let i = 0; i < video.pixels.length; i += 4) {
    let r = video.pixels[i + 0] / 255;
    let g = video.pixels[i + 1] / 255;
    let b = video.pixels[i + 2] / 255;
    inputs.push(r, g, b);
  }
  let target = [label];
  console.log('Adding example: ' + label);
  pixelBrain.addData(inputs, target);
}

// Video is ready!
function videoReady() {
  ready = true;
  // setTimeout(() => addExample('a'), 100);
  // setTimeout(() => addExample('a'), 200);
  // setTimeout(() => addExample('b'), 300);
  // setTimeout(() => addExample('b'), 400);
  // setTimeout(() => {
  //   pixelBrain.train({
  //     epochs: 50
  //   }, finishedTraining);
  // }, 500);
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

  // if (label == 'h') {
  textSize(64);
  textAlign(CENTER, CENTER);
  fill(255);
  text(label, width / 2, height / 2);
  // }
}
