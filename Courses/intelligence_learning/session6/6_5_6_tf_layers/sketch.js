// Daniel Shiffman
// http://codingtra.in

// TensorFlow.js Layers API
// Part 1: https://youtu.be/F4WWukTWoXY
// Part 2: https://youtu.be/iUiOx2fBx18

// This is the model
const model = tf.sequential();

// Create the hidden layer
// dense is a "full connected layer"
const hidden = tf.layers.dense({
  units: 4, // number of nodes
  inputShape: [2], // input shape
  activation: 'sigmoid'
});
// Add the layer
model.add(hidden);

// Creat another layer
const output = tf.layers.dense({
  units: 1,
  // here the input shape is "inferred from the previous layer"
  activation: 'sigmoid'
});
model.add(output);

// An optimizer using gradient descent
const sgdOpt = tf.train.sgd(0.1);

// I'm done configuring the model so compile it
model.compile({
  optimizer: sgdOpt,
  loss: tf.losses.meanSquaredError
});


const xs = tf.tensor2d([
  [0, 0],
  [0.5, 0.5],
  [1, 1]
]);

const ys = tf.tensor2d([
  [1],
  [0.5],
  [0]
]);


train().then(() => {
  let outputs = model.predict(xs);
  outputs.print();
  console.log('training complete');
});

async function train() {
  for (let i = 0; i < 1000; i++) {
    const config = {
      shuffle: true,
      epochs: 10
    }
    const response = await model.fit(xs, ys, config);
    console.log(response.history.loss[0]);
  }
}


// const xs = tf.tensor2d([
//   [0.25, 0.92],
//   [0.12, 0.3],
//   [0.4, 0.74],
//   [0.1, 0.22],
// ]);
// let ys = model.predict(xs);
// outputs.print();
