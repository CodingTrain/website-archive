/*
https://vimeo.com/channels/learningp5js/138331676
*/

var circleX = 50;

function setup() {
  createCanvas(600, 400);
}

function draw() {
  // background
  background(250, 250, 100);
  // ellipse
  fill(250, 200, 200);
  ellipse(circleX, 200, 80, 80);
  
  circleX = circleX + 1;
}