// More Steering Behaviors! (Pursue Slider Prediction)
// The Nature of Code
// The Coding Train / Daniel Shiffman
// https://youtu.be/Q4MU7pkDYmQ
// https://thecodingtrain.com/learning/nature-of-code/5.3-flee-pursue-evade.html

// Flee: https://editor.p5js.org/codingtrain/sketches/v-VoQtETO
// Pursue: https://editor.p5js.org/codingtrain/sketches/Lx3PJMq4m
// Evade: https://editor.p5js.org/codingtrain/sketches/X3ph02Byx
// Pursue Bouncing Ball: https://editor.p5js.org/codingtrain/sketches/itlyDq3ZB
// Pursue Wander: https://editor.p5js.org/codingtrain/sketches/EEnmY04lt
// Pursue Slider Prediction: https://editor.p5js.org/codingtrain/sketches/l7MgPpTUB

let pursuer;
let target;
let slider;
let pause = false;

function setup() {
  createCanvas(windowWidth, windowHeight);
  pursuer = new Vehicle(50, 50);
  target = new Target(width - 50, height - 50);
  slider = createSlider(1, 50, 10);
  slider.position(10, 10);
}

function mousePressed() {
  pause = true;
}

function mouseReleased() {
  pause = false;
}

function draw() {
  background(0);

  let steering = pursuer.pursue(target);
  pursuer.applyForce(steering);

  let d = p5.Vector.dist(pursuer.pos, target.pos);
  if (d < pursuer.r + target.r) {
    target = new Target(random(width), random(height));
    pursuer.pos.set(width / 2, height / 2);
  }

  if (!pause) {
    pursuer.update();
    target.update();
  }
  pursuer.show();

  target.edges();
  target.show();
}
