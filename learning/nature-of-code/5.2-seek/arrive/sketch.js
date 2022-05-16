// Seeking a Target (Arrive)
// The Nature of Code
// The Coding Train / Daniel Shiffman
// https://youtu.be/p1Ws1ZhG36g
// https://thecodingtrain.com/learning/nature-of-code/5.2-seek.html

// Seek: https://editor.p5js.org/codingtrain/sketches/AxuChwlgb
// Seek with Sliders: https://editor.p5js.org/codingtrain/sketches/DROTtSI7J
// Arrive: https://editor.p5js.org/codingtrain/sketches/dQx9oOfTN
// Pursue: https://editor.p5js.org/codingtrain/sketches/XbsgoU_of

let v;

function setup() {
  createCanvas(windowWidth, windowHeight);
  v = new Vehicle(width / 2, height / 2);
}

function draw() {
  background(0);

  let mouse = createVector(width / 2, height / 2);

  // Draw an ellipse at the mouse position
  fill(51);
  stroke(255);
  strokeWeight(2);
  ellipse(mouse.x, mouse.y, 48, 48);

  if (p5.Vector.dist(v.position, mouse) < 8) {
    v = new Vehicle(random(width), random(height));
  }

  // Call the appropriate steering behaviors for our agents
  v.arrive(mouse);
  v.update();
  v.display();
}
