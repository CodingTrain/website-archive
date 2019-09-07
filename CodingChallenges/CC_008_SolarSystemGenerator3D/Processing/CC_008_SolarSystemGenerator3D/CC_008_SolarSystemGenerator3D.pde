// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/dncudkelNxw

import peasy.*;
Planet sun;

PeasyCam cam;

void setup() {
  size(600, 600, P3D);
  cam = new PeasyCam(this, 500);
  sun = new Planet(50, 0, 0);
  sun.spawnMoons(4, 1);
}

void draw() {
  background(0);
  lights();
  sun.show();
  sun.orbit();
}
