// Shape Classifier (Generate Dataset p5.js port)
// Coding Challenge
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/158-shape-classifier.html
// https://youtu.be/3MqJzMvHE3E

// Generate Dataset: https://github.com/CodingTrain/website/tree/gh-pages/CodingChallenges/CC_158_Shape_Classifier/dataset
// Generate Dataset (port): https://editor.p5js.org/codingtrain/sketches/7leVIzy5l
// Training: https://github.com/CodingTrain/website/tree/gh-pages/CodingChallenges/CC_158_Shape_Classifier/training
// Mouse: https://editor.p5js.org/codingtrain/sketches/JgLVfCS4E
// Webcam: https://editor.p5js.org/codingtrain/sketches/2hZGBkqqq

function setup() {
  createCanvas(64, 64);
}

function draw() {
  for (let i = 0; i < 3; i++) {
    background(255);
    push();
    strokeWeight(4);
    let r = random(8, 24);
    let x = random(r, width - r);
    let y = random(r, height - r);
    stroke(random(100), random(100), random(100));
    translate(x, y);
    if (i == 0) {
      circle(0, 0, r * 2);
      save(`circle${nf(frameCount, 4, 0)}.png`);
    } else if (i == 1) {
      rectMode(CENTER);
      rotate(random(-0.1, 0.1));
      square(0, 0, r * 2);
      save(`square${nf(frameCount, 4, 0)}.png`);
    } else if (i == 2) {
      rotate(random(-0.1, 0.1));
      triangle(0, -r, r, r, -r, r);
      save(`triangle${nf(frameCount, 4, 0)}.png`);
    }
    pop();
  }

  if (frameCount == 1) {
    exit();
  }
}
