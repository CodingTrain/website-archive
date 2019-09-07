// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/FGAwi7wpU8c

import peasy.*;
Planet sun;

PeasyCam cam;

PImage sunTexture;
PImage[] textures = new PImage[3];

void setup() {
  size(600, 600, P3D);
  sunTexture = loadImage("sun.jpg");
  textures[0] = loadImage("mars.jpg");
  textures[1] = loadImage("earth.jpg");
  textures[2] = loadImage("mercury.jpg");
  cam = new PeasyCam(this, 500);
  sun = new Planet(50, 0, 0, sunTexture);
  sun.spawnMoons(4, 1);
}

void draw() {
  background(0);
  ambientLight(255,255,255);
  pointLight(255, 255, 255, 0, 0, 0);
  sun.show();
  sun.orbit();
}
