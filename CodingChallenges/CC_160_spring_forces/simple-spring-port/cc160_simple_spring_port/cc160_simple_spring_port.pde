// Spring Forces (Simple Spring Port)
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/160-spring-forces.html
// https://youtu.be/Rr-5HiXquhw

// Simple Spring: https://editor.p5js.org/codingtrain/sketches/dcd6-2mWa
// Spring Vector: https://editor.p5js.org/codingtrain/sketches/_A2pm_SSg
// Spring OOP: https://editor.p5js.org/codingtrain/sketches/9BAoEn4Po
// Soft Spring: https://editor.p5js.org/codingtrain/sketches/S5dY7qjxP

float y = 250;
float velocity = 0;
float restLength = 200;
float k = 0.01;

void setup() {
  size(600, 400);
}

void draw() {
  background(112, 50, 126);
  noStroke();
  fill(45, 197, 244);
  circle(300, y, 64);

  float x = y - restLength;
  float force = -k * x;

  // F = A
  velocity += force;
  y += velocity;

  velocity *= 0.99;
}
