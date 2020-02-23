// ml5.js: Neural Network Regression
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/learning/ml5/6.4-ml5-regression.html
// https://youtu.be/fFzvwdkzr_c
// https://editor.p5js.org/codingtrain/sketches/aw7R9aSkh

let model;
let targetLabel = 'C';

let state = 'collection';

let notes = {
  C: 261.6256,
  D: 293.6648,
  E: 329.6276,
  F: 349.2282,
  G: 391.9954,
  A: 440.0,
  B: 493.8833
};

let env, wave;

function setup() {
  createCanvas(400, 400);

  env = new p5.Envelope();
  env.setADSR(0.05, 0.1, 0.5, 1);
  env.setRange(1.2, 0);

  wave = new p5.Oscillator();

  wave.setType('sine');
  wave.start();
  wave.freq(440);
  wave.amp(env);

  let options = {
    inputs: ['x', 'y'],
    outputs: ['frequency'],
    task: 'regression',
    debug: 'true'
  };

  model = ml5.neuralNetwork(options);

  // model.loadData('mouse-notes.json', dataLoaded);
  // const modelInfo = {
  //   model: 'model/model.json',
  //   metadata: 'model/model_meta.json',
  //   weights: 'model/model.weights.bin'
  // }
  // model.load(modelInfo, modelLoaded);

  background(255);
}

function modelLoaded() {
  console.log('model loaded');
  state = 'prediction';
}

function dataLoaded() {
  console.log(model.data);
  let data = model.data.data.raw;
  // let data = model.getData();
  for (let i = 0; i < data.length; i++) {
    let inputs = data[i].xs;
    let target = data[i].ys;
    stroke(0);
    noFill();
    ellipse(inputs.x, inputs.y, 24);
    fill(0);
    noStroke();
    textAlign(CENTER, CENTER);
    text(target.label, inputs.x, inputs.y);
  }

  // state = 'training';
  // console.log('starting training');
  // model.normalizeData();
  // let options = {
  //   epochs: 200
  // }
  // model.train(options, whileTraining, finishedTraining);
}

function keyPressed() {
  if (key == 't') {
    state = 'training';
    console.log('starting training');
    model.normalizeData();
    let options = {
      epochs: 50
    };
    model.train(options, whileTraining, finishedTraining);
  } else if (key == 's') {
    model.saveData('mouse-notes');
  } else if (key == 'm') {
    model.save();
  } else {
    targetLabel = key.toUpperCase();
  }
}

function whileTraining(epoch, loss) {
  console.log(epoch);
}

function finishedTraining() {
  console.log('finished training.');
  state = 'prediction';
}

function mousePressed() {
  let inputs = {
    x: mouseX,
    y: mouseY
  };

  if (state == 'collection') {
    let targetFrequency = notes[targetLabel];
    let target = {
      frequency: targetFrequency
    };
    model.addData(inputs, target);
    stroke(0);
    noFill();
    ellipse(mouseX, mouseY, 24);
    fill(0);
    noStroke();
    textAlign(CENTER, CENTER);
    text(targetLabel, mouseX, mouseY);

    wave.freq(targetFrequency);
    env.play();
  } else if (state == 'prediction') {
    model.predict(inputs, gotResults);
  }
}

function gotResults(error, results) {
  if (error) {
    console.error(error);
    return;
  }
  console.log(results);
  stroke(0);
  fill(0, 0, 255, 100);
  ellipse(mouseX, mouseY, 24);
  fill(0);
  noStroke();
  textAlign(CENTER, CENTER);
  text(floor(results[0].value), mouseX, mouseY);
  wave.freq(results[0].value);

  env.play();
}
