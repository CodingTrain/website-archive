// ml5.js: Training a Convolutional Neural Network for Image Classification
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/learning/ml5/8.4-cnn-image-classification.html
// https://youtu.be/hWurN0XhzLY
// https://editor.p5js.org/codingtrain/sketches/ogxO8har_
// (mask) https://editor.p5js.org/codingtrain/sketches/tKLoeUD0u

let video;
let videoSize = 64;
let ready = false;

let pixelBrain;
let label = '';

function setup() {
  createCanvas(400, 400);
  video = createCapture(VIDEO, videoReady);
  video.size(videoSize, videoSize);
  video.hide();

  let options = {
    inputs: [64, 64, 4],
    task: 'imageClassification',
    debug: true,
  };
  pixelBrain = ml5.neuralNetwork(options);
}

function loaded() {
  pixelBrain.train(
    {
      epochs: 50,
    },
    finishedTraining
  );
}

function finishedTraining() {
  console.log('training complete');
  classifyVideo();
}

function classifyVideo() {
  let inputImage = {
    image: video,
  };
  pixelBrain.classify(inputImage, gotResults);
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
    pixelBrain.normalizeData();
    pixelBrain.train(
      {
        epochs: 50,
      },
      finishedTraining
    );
  } else if (key == 's') {
    pixelBrain.saveData();
  } else {
    addExample(key);
  }
}

function addExample(label) {
  let inputImage = {
    image: video,
  };
  let target = {
    label,
  };
  console.log('Adding example: ' + label);
  pixelBrain.addData(inputImage, target);
}

// Video is ready!
function videoReady() {
  ready = true;
}

function draw() {
  background(0);
  if (ready) {
    image(video, 0, 0, width, height);
  }

  textSize(64);
  textAlign(CENTER, CENTER);
  fill(255);
  text(label, width / 2, height / 2);
}
