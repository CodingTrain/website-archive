// What is an Array?
// Code! Programming with p5.js
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/beginners/p5js/7.1-what-is-an-array.html
// https://youtu.be/VIQoUghHSxU
// https://editor.p5js.org/codingtrain/sketches/DmwVbhOZ

var words = ["rainbow", "heart", "purple", "friendship", "love"];

var index = 0;

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(0);

  fill(255);
  textSize(32);
  text(words[index], 12, 200);
}

function mousePressed() {
  index = index + 1;

  if (index == words.length) {
    index = 0;
  }
}
