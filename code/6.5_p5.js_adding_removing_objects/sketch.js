/* 
6.5 p5.js Adding Removing Objects 
Code for https://vimeo.com/channels/learningp5js/141211392
Concepts introducing push(), splice() 1:30
*/

var bubbles = [];

function setup() {
  createCanvas(600, 400);
}

function mousePressed() {
  bubbles.push(new Bubble(mouseX, mouseY));
}

function draw() {
  background(0);
  for (var i = 0; i < bubbles.length; i++) {
    bubbles[i].move();
    bubbles[i].display();
  }
}

function Bubble(x, y) {
  this.x = x;
  this.y = y;

  this.display = function() {
    stroke(255);
    fill(255, 0, 150, 50);
    ellipse(this.x, this.y, 24, 24);
  }

  this.move = function() {
    this.x = this.x + random(-1, 1);
    this.y = this.y + random(-1, 1);

  }
}