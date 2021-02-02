// Angles and Vectors (Asteroids Exercise)
// The Nature of Code
// The Coding Train / Daniel Shiffman
// https://youtu.be/oXwCVDXS2Lg
// https://thecodingtrain.com/learning/nature-of-code/3.3-angles-and-vectors.html

// Direction Pointing: https://editor.p5js.org/codingtrain/sketches/9M9yQJVVc
// Vehicle: https://editor.p5js.org/codingtrain/sketches/HtXbIDsESi
// Asteroids Exercise: https://editor.p5js.org/codingtrain/sketches/pXS395i0h

let ship;

function setup() {
  createCanvas(640, 360);
  ship = new Spaceship();
}

function draw() {
  background(0);

  // Update location
  ship.update();
  // Wrape edges
  ship.wrapEdges();
  // Draw ship
  ship.display();

  // fill(0);
  // text("left right arrows to turn, z to thrust", 10, height - 5);

  // Turn or thrust the ship depending on what key is pressed
  // 90 is the keyCode for 'z' or 'Z'

  if (keyIsDown(LEFT_ARROW)) {
    ship.turn(-0.03);
  } else if (keyIsDown(RIGHT_ARROW)) {
    ship.turn(0.03);
  } else if (keyIsDown(90)) {
    ship.thrust();
  }
}
