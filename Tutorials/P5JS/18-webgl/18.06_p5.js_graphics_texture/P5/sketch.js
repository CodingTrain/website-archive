// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain

// Video: https://youtu.be/3tTZlTq4Cxs

let angle = 0;

let kitten;

let graphics;

let love;

function preload() {
  kitten = loadImage('kittens/kitten2.jpg');
}


function setup() {
  createCanvas(400, 300, WEBGL);
  // graphics = createGraphics(300, 300);
  //graphics.background(255);

  love = createGraphics(300, 300);
  //love.background(255, 100);
  love.fill(255);
  love.textAlign(CENTER);
  love.textSize(64);
  love.text('love', 150, 150);
}

function draw() {
  background(0);

  // graphics.fill(255, 0, 255);
  // graphics.ellipse(mouseX, mouseY, 20);
  ambientLight(100);
  directionalLight(255, 255, 255, 0, 0, 1);
  rotateX(angle);
  rotateY(angle * 1.3);
  rotateZ(angle * 0.7);
  //
  // texture(love);
  // box(100);

  texture(love);

  plane(300, 300);

  angle += 0.03;



}
