// Shape Classifier (Training)
// Coding Challenge
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/158-shape-classifier.html
// https://youtu.be/3MqJzMvHE3E

// Generate Dataset: https://github.com/CodingTrain/website/tree/gh-pages/CodingChallenges/CC_158_Shape_Classifier/dataset
// Generate Dataset (port): https://editor.p5js.org/codingtrain/sketches/7leVIzy5l
// Training: https://github.com/CodingTrain/website/tree/gh-pages/CodingChallenges/CC_158_Shape_Classifier/training
// Mouse: https://editor.p5js.org/codingtrain/sketches/JgLVfCS4E
// Webcam: https://editor.p5js.org/codingtrain/sketches/2hZGBkqqq

let circles = [];
let squares = [];
let triangles = [];

function preload() {
  for (let i = 0; i < 100; i++) {
    let index = nf(i + 1, 4, 0);
    circles[i] = loadImage(`data/circle${index}.png`);
    squares[i] = loadImage(`data/square${index}.png`);
    triangles[i] = loadImage(`data/triangle${index}.png`);
  }
}

let shapeClassifier;

function setup() {
  createCanvas(400, 400);
  //background(0);
  //image(squares[0], 0, 0, width, height);

  let options = {
    inputs: [64, 64, 4],
    task: 'imageClassification',
    debug: true
  };
  shapeClassifier = ml5.neuralNetwork(options);

  for (let i = 0; i < circles.length; i++) {
    shapeClassifier.addData({ image: circles[i] }, { label: 'circle' });
    shapeClassifier.addData({ image: squares[i] }, { label: 'square' });
    shapeClassifier.addData({ image: triangles[i] }, { label: 'triangle' });
  }
  shapeClassifier.normalizeData();
  shapeClassifier.train({ epochs: 50 }, finishedTraining);
}

function finishedTraining() {
  console.log('finished training!');
  shapeClassifier.save();
}
