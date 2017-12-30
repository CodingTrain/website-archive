// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain

// Video: https://youtu.be/6TPVoB4uQCU

let angle = 0;

function setup() {
  createCanvas(400, 300, WEBGL);
}

function draw() {
  background(175);

  rectMode(CENTER);
  noStroke()
  fill(0, 0, 255);
  //translate(0, 0, mouseX);
  rotateX(angle);
  rotateY(angle * 0.3);
  rotateZ(angle * 1.2);
  //rect(0, 0, 150, 150);
  torus(50, 10);

  angle += 0.07;
}
