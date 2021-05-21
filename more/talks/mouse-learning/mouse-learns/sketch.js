// Mouse Learns
// Mouse Learning Talk
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/more/talks/mouse-learning.html

// if/else background: https://editor.p5js.org/codingtrain/sketches/yFaE6qQyO
// mouse learns: https://editor.p5js.org/codingtrain/sketches/kWjDFS51O

let brain;
let trainButton;

let isTrained = false;

let dropdown;

function setup() {
  let canvas = createCanvas(400, 400);
  canvas.mousePressed(trainingData);

  dropdown = createSelect();
  dropdown.option("red");
  dropdown.option("blue");

  let options = {
    // inputs: ["mouseX", "mouseY"],
    // outputs: ["left","right"],
    task: "classification",
    debug: true,
  };
  brain = ml5.neuralNetwork(options);
  trainButton = createButton("train");
  trainButton.mousePressed(function() {
    brain.normalizeData();
    brain.train({ epochs: 100 }, finished);
  });
}

function finished() {
  console.log("training complete");
  isTrained = true;
}

function trainingData() {
  let inputs = { mouseX, mouseY };
  let label = dropdown.value();
  brain.addData(inputs, { label });
}

function draw() {
  background(0);

  // if (mouseX > width / 2) {
  //   background(255, 0, 0);
  // } else {
  //   background(0, 0, 255);
  // }

  if (isTrained) {
    let inputs = { mouseX, mouseY };
    let outputs = brain.classifySync(inputs);
    background(outputs[0].label);
  }

  strokeWeight(8);
  stroke(255);
  //line(width / 2, 0, width / 2, height);

  let data = brain.neuralNetworkData.data.raw;
  strokeWeight(4);
  for (let row of data) {
    //console.log(row);
    stroke(0);
    fill(row.ys.label);
    circle(row.xs.mouseX, row.xs.mouseY, 24);
  }
}
