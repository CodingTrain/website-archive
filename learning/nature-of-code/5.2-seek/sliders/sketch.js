// Seeking a Target (Seek with Sliders)
// The Nature of Code
// The Coding Train / Daniel Shiffman
// https://youtu.be/p1Ws1ZhG36g
// https://thecodingtrain.com/learning/nature-of-code/5.2-seek.html

// Seek: https://editor.p5js.org/codingtrain/sketches/AxuChwlgb
// Seek with Sliders: https://editor.p5js.org/codingtrain/sketches/DROTtSI7J
// Arrive: https://editor.p5js.org/codingtrain/sketches/dQx9oOfTN
// Pursue: https://editor.p5js.org/codingtrain/sketches/XbsgoU_of

let vehicle;
let target;

let sliderSpeed, sliderForce;

function setup() {
  const canvas = createCanvas(windowWidth, windowHeight - 50);
  sliderSpeed = select('#maxspeed');
  sliderForce = select('#maxforce');
  canvas.parent('#canvas-container');
  vehicle = new Vehicle(100, 100);
  target = createVector(random(width), random(height));
}

function draw() {
  background(0);
  fill(255, 0, 0);
  noStroke();
  circle(target.x, target.y, 32);

  let d = dist(target.x, target.y, vehicle.pos.x, vehicle.pos.y);
  if (d < 5) {
    target = createVector(random(width), random(height));
  }

  circle(target.x, target.y, 32);
  vehicle.seek(target);
  vehicle.update();
  vehicle.show();
}
