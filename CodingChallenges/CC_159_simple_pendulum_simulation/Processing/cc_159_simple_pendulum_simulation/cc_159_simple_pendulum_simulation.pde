// Simple Pendulum Simulation
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/159-simple-pendulum-simulation.html
// https://youtu.be/NBWMtlbbOag
// https://editor.p5js.org/codingtrain/sketches/SN-39sHAC

float angle;

float angleV = 0;
float angleA = 0;

PVector bob;
float len;
PVector origin;

float gravity = 1;

void setup() {
  size(600, 800);
  origin = new PVector(300, 0);
  angle = PI/4;
  bob = new PVector();
  len = 200;
}

void draw() {
  background(0);
  
  float force = gravity * sin(angle);
  angleA = (-1 * force) / len;
  angleV += angleA;
  angle += angleV;
  
  // angleV *= 0.99
  
  bob.x = len * sin(angle) + origin.x;
  bob.y = len * cos(angle) + origin.y;
  
  stroke(255);
  strokeWeight(8);
  fill(127);
  line(origin.x, origin.y, bob.x, bob.y);
  circle(bob.x, bob.y, 64);
}
