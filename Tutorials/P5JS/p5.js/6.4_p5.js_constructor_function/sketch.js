/* 
6.4 p5.js The Constructor Function 
Code for https://vimeo.com/channels/learningp5js/141211393
*/

var bubbles = [];

function setup() {
  createCanvas(600, 400);
  for (var i = 0; i < 4; i++) {
    bubbles[i] = new Bubble();
  }
}

function draw() {
  background(0);
  for (var i = 0; i < bubbles.length; i++) {
    bubbles[i].move();
    bubbles[i].display();
  }
}

function Bubble() {
  this.x = random(0, width);
  this.y = random(0, height);

  this.display = function() {
    stroke(255);
    noFill();
    ellipse(this.x, this.y, 24, 24);
  }

  this.move = function() {
    this.x = this.x + random(-1, 1);
    this.y = this.y + random(-1, 1);

  }
}