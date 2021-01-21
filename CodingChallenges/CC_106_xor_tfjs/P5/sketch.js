// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain

// XOR with tf.js
// https://youtu.be/N3ZnNa01BPM

let model;

let resolution = 20;
let cols;
let rows;

let xs;

const train_xs = tf.tensor2d([
  [0, 0],
  [1, 0],
  [0, 1],
  [1, 1]
]);
const train_ys = tf.tensor2d([[0], [1], [1], [0]]);

function setup() {
  createCanvas(400, 400);
  cols = width / resolution;
  rows = height / resolution;

  // Create the input data
  let inputs = [];
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x1 = i / cols;
      let x2 = j / rows;
      inputs.push([x1, x2]);
    }
  }
  xs = tf.tensor2d(inputs);

  model = tf.sequential();
  let hidden = tf.layers.dense({
    inputShape: [2],
    units: 16,
    activation: 'sigmoid'
  });
  let output = tf.layers.dense({
    units: 1,
    activation: 'sigmoid'
  });
  model.add(hidden);
  model.add(output);

  const optimizer = tf.train.adam(0.2);
  model.compile({
    optimizer: optimizer,
    loss: 'meanSquaredError'
  });

  setTimeout(train, 10);
}

function train() {
  trainModel().then(result => {
    ///console.log(result.history.loss[0]);
    setTimeout(train, 10);
  });
}

function trainModel() {
  return model.fit(train_xs, train_ys, {
    shuffle: true,
    epochs: 1
  });
}

function draw() {
  background(0);

  tf.tidy(() => {
    // Get the predictions
    let ys = model.predict(xs);
    let y_values = ys.dataSync();

    // Draw the results
    let index = 0;
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        let br = y_values[index] * 255;
        fill(br);
        rect(i * resolution, j * resolution, resolution, resolution);
        fill(255 - br);
        textSize(8);
        textAlign(CENTER, CENTER);
        text(
          nf(y_values[index], 1, 2),
          i * resolution + resolution / 2,
          j * resolution + resolution / 2
        );
        index++;
      }
    }
  });
}
