// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/BrFZ5RkywcY

var angle = 0;

var img;

function preload() {
  img = loadImage("hedge.jpg");
  l
}

function setup() {
  createCanvas(400, 400, WEBGL);
}

function draw() {
  background(51);
  pointLight(255, 0, 255, 200, 0, 0);
  push();
  translate(200, 0, 0);
  sphere(10);
  pop();
  translate(0, 0, mouseX);
  rotateX(angle);
  rotateY(angle * 0.6);
  texture(img);
  box(50);

  angle += 0.02;

  //fill(0, 255, 0);
  //rect(200, 200, 100, 100);

  //ellipse(200, 200, 100, 100);
}
