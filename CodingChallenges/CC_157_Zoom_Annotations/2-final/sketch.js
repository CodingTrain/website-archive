// Zoom Annotations (Final)
// Coding Challenge
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/157-zoom-annotations.html
// https://youtu.be/

// Basic: https://editor.p5js.org/codingtrain/sketches/EaioB_iJs
// Final: https://editor.p5js.org/codingtrain/sketches/ELpl_VAqs

// Classifier Variable
let classifier;
// Model URL
let imageModelURL = 'https://teachablemachine.withgoogle.com/models/iAr6pG2B6/';

// Video
let video;
let flippedVideo;
// To store the classification
let label = '';

class Gesture {
  constructor() {
    this.icon;
    this.fade = 0;
  }
  
  show() {
    tint(255, this.fade);
    imageMode(CENTER);
    image(this.icon, width / 2, height / 2, 720, 720);
    this.fade -= 10;  
  }
}

let gestures ={
  question: new Gesture(),
  yes: new Gesture(),
  no: new Gesture(),
  love: new Gesture(),
  laugh: new Gesture()
}

// Load the model first
function preload() {
  classifier = ml5.imageClassifier(imageModelURL + 'model.json');
  gestures['question'].icon = loadImage('question.png');
  gestures['yes'].icon = loadImage('yes.png');
  gestures['no'].icon = loadImage('no.png');
  gestures['laugh'].icon = loadImage('laugh.png');
  gestures['love'].icon = createVideo('love.mp4');
}

function setup() {
  createCanvas(1280, 720);
  gestures['love'].icon.hide();
  gestures['love'].icon.loop();
  // Create the video
  video = createCapture(VIDEO);
  video.size(160, 120);
  // video.hide();

  flippedVideo = ml5.flipImage(video);
  // Start classifying
  classifyVideo();
}

function draw() {
  background(0, 255, 0);
  imageMode(CORNER);

  // Draw the video
  // tint(255);
  // image(flippedVideo, 0, 0);
  if (!gestures[label]) return;
  gestures[label].fade = 255;
  if (gestures[label].fade > 0) gestures[label].show();
}

// Get a prediction for the current video frame
function classifyVideo() {
  flippedVideo = ml5.flipImage(video);
  classifier.classify(flippedVideo, gotResult);
}

// When we get a result
function gotResult(error, results) {
  // If there is an error
  if (error) {
    console.error(error);
    return;
  }
  // The results are in an array ordered by confidence.
  label = results[0].label;
  // Classifiy again!
  classifyVideo();
}
