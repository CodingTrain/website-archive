// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain

// Video: https://youtu.be/DZlw-IS5OkI

let angle = 0;
let kitten;

function preload() {
  kitten = loadImage('kittens/kitten2.jpg');
}

function setup() {
  createCanvas(400, 300, WEBGL);
}

function draw() {
  background(0);
  ambientLight(255);
  rotateX(angle);
  rotateY(angle * 1.3);
  rotateZ(angle * 0.7);
  //box(100);

  //fill(255);
  texture(kitten);
  translate(-50, -50);
  beginShape();
  vertex(-50, 0, 0, 0, 0);
  vertex(100, 0, 0, 1, 0);
  vertex(100, 100, 0, 1, 1);
  vertex(0, 200, 0, 0, 1);
  endShape(CLOSE);

  angle += 0.03;
}
