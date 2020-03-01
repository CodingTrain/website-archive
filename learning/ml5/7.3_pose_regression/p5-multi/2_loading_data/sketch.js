// ml5.js: Pose Regression
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/learning/ml5/7.3-pose-regression.html
// https://youtu.be/lob74HqHYJ0

// All code: https://editor.p5js.org/codingtrain/sketches/JI_j-PiLk

// Separated into three sketches
// 1: Data Collection: https://editor.p5js.org/codingtrain/sketches/Fe1ZNKw1Z
// 2: Model Training: https://editor.p5js.org/codingtrain/sketches/KLrIligVq
// 3: Model Deployment: https://editor.p5js.org/codingtrain/sketches/nejAYCA6N

let brain;

function setup() {
  noCanvas();
  let options = {
    inputs: 34,
    outputs: 3,
    task: 'regression',
    debug: true
  };
  brain = ml5.neuralNetwork(options);
  brain.loadData('color_poses.json', dataReady);
}

function dataReady() {
  brain.normalizeData();
  brain.train({ epochs: 50 }, finished);
}

function finished() {
  console.log('model trained');
  brain.save();
}
