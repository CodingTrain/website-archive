// Daniel Shiffman
// Intelligence and Learning
// The Coding Train

// Full tutorial playlist:
// https://www.youtube.com/playlist?list=PLRqwX-V7Uu6bmMRCIoTi72aNWHo7epX4L

// Code from end of 7.11
// https://youtu.be/GQCKDjg2Z7w

// Community version:
// https://codingtrain.github.io/ColorClassifer-TensorFlow.js
// https://github.com/CodingTrain/ColorClassifer-TensorFlow.js

let data;
let xs, ys;

let model;

let lossP;

let labelList = [
  'red-ish',
  'green-ish',
  'blue-ish',
  'orange-ish',
  'yellow-ish',
  'pink-ish',
  'purple-ish',
  'brown-ish',
  'grey-ish'
]

function preload() {
  data = loadJSON('colorData.json');
}


function setup() {
  lossP = createP('Loss');
  //console.log(data.entries.length);

  let colors = [];
  let labels = [];
  for (let record of data.entries) {
    let col = [record.r / 255, record.g / 255, record.b / 255];
    colors.push(col);
    labels.push(labelList.indexOf(record.label));
  }
  //console.log(colors);

  xs = tf.tensor2d(colors);
  //console.log(xs.shape);
  //xs.print();

  let labelsTensor = tf.tensor1d(labels, 'int32');
  // labelsTensor.print();

  ys = tf.oneHot(labelsTensor, 9);
  labelsTensor.dispose();

  // console.log(xs.shape);
  // console.log(ys.shape);
  // xs.print();
  // ys.print();


  // Building Model
  model = tf.sequential();

  // Architecture of Model
  let hidden = tf.layers.dense({
    units: 16,
    activation: 'sigmoid',
    inputDim: 3
  });
  let output = tf.layers.dense({
    units: 9,
    activation: 'softmax'
  });
  model.add(hidden);
  model.add(output);

  // Create an optimizer
  const lr = 0.2;
  const optimizer = tf.train.sgd(lr);

  model.compile({
    optimizer: optimizer,
    loss: 'categoricalCrossentropy'
  });

  train().then(results => {
    console.log(results.history.loss);
  });

}

// Training Function
async function train() {
  const options = {
    epochs: 10,
    validationSplit: 0.1,
    shuffle: true,
    callbacks: {
      onTrainBegin: () => console.log('training start'),
      onTrainEnd: () => console.log('training complete'),
      onBatchEnd: async(num, logs) => {
          await tf.nextFrame();
      },
      onEpochEnd: (num, logs) => {
        console.log('Epoch: ' + num);
        lossP.html('Loss: ' + logs.loss);
        // console.log('Loss: ' + logs.loss);
      }
    }
  }
  return await model.fit(xs, ys, options);
}

// Animation
function draw() {
  background(0);
  stroke(255);
  strokeWeight(4);
  line(frameCount % width, 0, frameCount % width, height)
}
