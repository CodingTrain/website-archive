// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Video: https://youtu.be/RTc6i-7N3ms
// Transcribe to Javascript: Chuck England

let robotarm;
const segLen = 15;
const numSegs = 40;

function setup() {
  createCanvas(windowWidth, windowHeight);

  robotarm = new RobotArm(width / 2, height, numSegs, segLen, 0);
}

function draw() {
  background(51);

  robotarm.update();
  robotarm.show();
}
