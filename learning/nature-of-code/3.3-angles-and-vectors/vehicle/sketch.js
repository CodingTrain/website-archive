// Angles and Vectors (Vehicle)
// The Nature of Code
// The Coding Train / Daniel Shiffman
// https://youtu.be/oXwCVDXS2Lg
// https://thecodingtrain.com/learning/nature-of-code/3.3-angles-and-vectors.html

// Direction Pointing: https://editor.p5js.org/codingtrain/sketches/9M9yQJVVc
// Vehicle: https://editor.p5js.org/codingtrain/sketches/HtXbIDsESi
// Asteroids Exercise: https://editor.p5js.org/codingtrain/sketches/pXS395i0h

let mover;

function setup() {
  createCanvas(400, 400);
  mover = new Mover(100, 200, 4);
}

function draw() {
  background(0);

  if (keyIsDown(LEFT_ARROW)) {
    mover.angle -= 0.03;
  } else if (keyIsDown(RIGHT_ARROW)) {
    mover.angle += 0.03;
  }

  mover.update();
  // mover.edges();
  mover.show();
}
