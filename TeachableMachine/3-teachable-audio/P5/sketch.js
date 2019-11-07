// Teachable Machine
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/TeachableMachine/3-teachable-audio
// https://editor.p5js.org/codingtrain/sketches/e3nrNMG7A

let video;

let label = "waiting...";

let classifier;

// STEP 1: Load the model!
function preload() {
  classifier = ml5.soundClassifier(
    "https://storage.googleapis.com/tm-models/YZIaLXxm/model.json"
  );
}

function setup() {
  createCanvas(640, 520);

  // STEP 2: Start classifying
  classifyAudio();
}

// STEP 2 classify!
function classifyAudio() {
  classifier.classify(gotResults);
}

function draw() {
  background(0);

  // STEP 4: Draw the label
  // textSize(32);
  textAlign(CENTER, CENTER);
  // fill(255);
  // text(label, width/2, height - 16);

  let emoji = "🎧";
  if (label == "Train") {
    emoji = "🚂";
  } else if (label == "Bell") {
    emoji = "🛎";
  } else if (label == "Ukulele") {
    emoji = "🎸";
  }

  textSize(256);
  text(emoji, width / 2, height / 2);
}

// STEP 3: Get the classification!
function gotResults(error, results) {
  if (error) {
    console.error(error);
    return;
  }
  label = results[0].label;
}
