// Wander (Sliders)
// The Nature of Code
// The Coding Train / Daniel Shiffman
// https://youtu.be/ujsR2vcJlLk
// https://thecodingtrain.com/learning/nature-of-code/5.5-wander.html

// Main: https://editor.p5js.org/codingtrain/sketches/LVtVlS52Q
// With Sliders: https://editor.p5js.org/codingtrain/sketches/uxemh7FGc
// Deleting Positions: https://editor.p5js.org/codingtrain/sketches/EWHjy--Os
// 3D: https://editor.p5js.org/codingtrain/sketches/t6sFXmVrk
// Displacement: https://editor.p5js.org/codingtrain/sketches/VdHUvgHkm
// Perlin Noise: https://editor.p5js.org/codingtrain/sketches/XH2DtikuI

let vehicle;

let slider1, slider2, slider3;
let pause = false;
function mousePressed() {
  pause = true;
}

function mouseReleased() {
  pause = false;
}

function setup() {
  createCanvas(windowWidth, windowHeight - 25);
  vehicle = new Vehicle(width / 2, height / 2);
  slider1 = createSlider(100, 250, 150);
  slider2 = createSlider(50, 100, 50);
  slider3 = createSlider(0.1, 0.5, 0.25, 0.01);
}

function draw() {
  background(0);

  vehicle.wander();
  if (!pause) vehicle.update();
  vehicle.show();
  vehicle.edges();
}
