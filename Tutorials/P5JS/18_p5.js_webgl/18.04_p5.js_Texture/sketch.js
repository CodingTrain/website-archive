// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain

// Video: https://youtu.be/O1mYw-3Wl_Q

let angle = 0;
let kitten;
let cam;

function preload() {
  kitten = loadImage('kittens/kitten0.jpg')
}

function setup() {
  createCanvas(400, 300, WEBGL);
  cam = createCapture(VIDEO);
  cam.size(320, 240);
  cam.hide();
}

function draw() {
  let dx = mouseX - width / 2;
  let dy = mouseY - height / 2;
  let v = createVector(dx, dy, 0);
  v.div(100);

  // ambientLight(255);
  directionalLight(255, 255, 255, v);
  background(175);

  push();
  rotateX(angle);
  rotateY(angle * 0.3);
  rotateZ(angle * 1.2);

  noStroke();
  //ambientMaterial(0, 0, 255);
  texture(cam);
  //torus(100, 25);
  box(100);
  pop();

  translate(0, 100);
  rotateX(HALF_PI);
  ambientMaterial(255);
  plane(500, 500);

  angle += 0.03;
}
