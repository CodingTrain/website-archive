var canvas;
var mic;

function windowResized() {
  //console.log('resized');
  resizeCanvas(windowWidth, windowHeight);
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0, 0);
  //canvas.style('z-index', '-1');
  // mic = new p5.AudioIn();
  // mic.start();
  //background(175);
}

function keyPressed() {
  clear();
}

function draw() {
  if (mouseIsPressed) {
    line(pmouseX, pmouseY, mouseX, mouseY);
  }
  // var vol = mic.getLevel();
  // ellipse(width / 2, height / 2, vol * width);
}
