/* 
6.8 p5.js deleting objects using splice()
Code for video https://vimeo.com/channels/learningp5js/141919523
Video referenced 13:00 (function that returns a value), 5.3 p5.js functions and return https://vimeo.com/channels/learningp5js/139587730
*/

var bubbles = [];

function setup() {
  createCanvas(600, 400);
}

function mousePressed() {
  var b = new Bubble(mouseX, mouseY);
  bubbles.push(b);
}

function draw() {
  background(0);
  for (var i = bubbles.length - 1; i >= 0; i--) {
    bubbles[i].update();
    bubbles[i].display();
    if (bubbles[i].isFinished()) {
      bubbles.splice(i, 1);
    }
  }
}