/*
https://vimeo.com/channels/learningp5js/138935677
*/

function setup() {
  createCanvas(600, 400);
}

function draw() {
  background(0);
  
  
  stroke(255);
  strokeWeight(4);
  noFill();
  
  if (mouseX > 300 && mouseX < 400 && mouseY > 200 && mouseY < 300) {
    if (mouseIsPressed) {
      background(0, 255, 0);
    }
    fill(255, 0, 200);
  }
    rect(300, 200, 100, 100);
}