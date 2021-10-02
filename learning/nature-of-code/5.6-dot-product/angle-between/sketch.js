// Scalar Projection (Angle Between)
// The Nature of Code
// The Coding Train / Daniel Shiffman
// https://youtu.be/DHPfoqiE4yQ
// https://thecodingtrain.com/learning/nature-of-code/5.6-dot-product.html

// Angle Between: https://editor.p5js.org/codingtrain/sketches/ORP5Yx7JX
// Scalar Projection: https://editor.p5js.org/codingtrain/sketches/c4jmHLFQI

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(255);

  // A "vector" (really a point) to store the mouse position and screen center position
  const mouseLoc = createVector(mouseX, mouseY);
  const centerLoc = createVector(width / 2, height / 2);

  // Aha, a vector to store the displacement between the mouse and center
  const v = p5.Vector.sub(mouseLoc, centerLoc);
  v.normalize();
  v.mult(75);

  const xaxis = createVector(75, 0);
  // Render the vector
  drawVector(v, createVector(100, height / 2), 1.0);
  drawVector(xaxis, createVector(100, height / 2), 1.0);

  const theta = v.angleBetween(xaxis);

  fill(0);
  textSize(32);
  textFont("courier");
  textAlign(LEFT, CENTER);
  text(
    `${int(degrees(theta))} degrees\n${nf(theta, 1, 3)} radians`,
    200,
    height / 2
  );
}

// Renders a vector object 'v' as an arrow and a position 'loc'
function drawVector(v, pos, scayl) {
  push();
  const arrowsize = 6;
  // Translate to position to render vector
  translate(pos.x, pos.y);
  stroke(0);
  strokeWeight(2);
  // Call vector heading function to get direction (pointing up is a heading of 0)
  rotate(v.heading());
  // Calculate length of vector & scale it to be bigger or smaller if necessary
  const len = v.mag() * scayl;
  // Draw three lines to make an arrow
  line(0, 0, len, 0);
  line(len, 0, len - arrowsize, +arrowsize / 2);
  line(len, 0, len - arrowsize, -arrowsize / 2);
  pop();
}
