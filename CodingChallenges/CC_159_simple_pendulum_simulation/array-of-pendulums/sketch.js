// Simple Pendulum Simulation Array
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/159-simple-pendulum-simulation.html
// https://youtu.be/NBWMtlbbOag

let penduls = [];
let spacing = 10;
let gravity = -0.25;

function setup() {
  createCanvas(windowWidth, windowHeight);
  let total = floor(height / spacing);
  for (let i = 0; i < total; i++) {
    x = i * spacing;
    penduls[i] = new Pendulum(
      width / 2,
      height,
      spacing + i * spacing,
      spacing
    );
  }
}

function draw() {
  background(112, 50, 126, 10);
  for (let pendul of penduls) {
    pendul.update();
    pendul.show();
  }
}
