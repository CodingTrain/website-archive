// Daniel Shiffman
// Intelligence and Learning
// The Coding Train

// Full tutorial playlist:
// https://www.youtube.com/playlist?list=PLRqwX-V7Uu6bmMRCIoTi72aNWHo7epX4L

// Code from end of 7.6
// https://youtu.be/rw_LVFpIzJg

// Community version:
// https://codingtrain.github.io/ColorClassifer-TensorFlow.js
// https://github.com/CodingTrain/ColorClassifer-TensorFlow.js

let data;

function preload() {
  data = loadJSON('colorData.json');
}


function setup() {
  //console.log(data.entries.length);

  let colors = [];
  for (let record of data.entries) {
    let col = [record.r / 255, record.g / 255, record.b / 255];
    colors.push(col);
  }
  //console.log(colors);

  let xs = tf.tensor2d(colors);
  console.log(xs.shape);
  xs.print();

}
