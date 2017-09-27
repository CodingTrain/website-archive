// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain

// Video: https://youtu.be/76fiD5DvzeQ

function setup() {
  createCanvas(400, 400);
  angleMode(DEGREES);
}

function draw() {
  background(0);
  stroke(255);
  noFill();

  strokeWeight(4);
  point(mouseX, mouseY);
  point(150, 50);
  point(250, 60);
  point(300, 200);
  strokeWeight(1);

  beginShape();

  let spacing = map(mouseX, 0, width, 5, 100);
  for (let a = 0; a < 360; a += spacing) {
    let x = 100 * sin(a) + 200;
    let y = 100 * cos(a) + 200;
    vertex(x, y);
  }

  curveVertex(mouseX, mouseY);
  curveVertex(100, 200);
  curveVertex(150, 50);
  curveVertex(250, 60);
  curveVertex(300, 200);
  curveVertex(300, 200);
  endShape();
}
