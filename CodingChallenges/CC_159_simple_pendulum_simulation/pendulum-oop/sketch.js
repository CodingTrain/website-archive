// Simple Pendulum Simulation OOP Variation
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/159-simple-pendulum-simulation.html
// https://youtu.be/NBWMtlbbOag

let pendul;

function setup() {
  createCanvas(640, 360);
  // Make a new Pendulum with an origin position and armlength
  pendul = new Pendulum(width / 2, 0, 175);
}

function draw() {
  background(0);
  pendul.update();
  pendul.show();
}
