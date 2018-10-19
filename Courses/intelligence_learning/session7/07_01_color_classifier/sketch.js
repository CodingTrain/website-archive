// Daniel Shiffman
// Intelligence and Learning
// The Coding Train

// Full tutorial playlist:
// https://www.youtube.com/playlist?list=PLRqwX-V7Uu6bmMRCIoTi72aNWHo7epX4L

// Code from end of 7.1
// https://youtu.be/y59-frfKR58

// Community version:
// https://codingtrain.github.io/ColorClassifer-TensorFlow.js
// https://github.com/CodingTrain/ColorClassifer-TensorFlow.js

function setup() {
  createCanvas(100, 100);
  let r = floor(random(256));
  let g = floor(random(256));
  let b = floor(random(256));
  background(r, g, b);

  let dropdown = createSelect();
  dropdown.option('red-ish');
  dropdown.option('blue-ish');
  dropdown.option('green-ish');

  let submit = createButton('submit');
  submit.mousePressed(sendData);



}

function sendData() {
  // send this data to something?
  // send the data to firebase!
}
