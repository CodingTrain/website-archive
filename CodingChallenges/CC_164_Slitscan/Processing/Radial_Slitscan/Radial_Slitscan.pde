// Radial Slitscan
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/challenges/164-time-slitscan.html

import processing.video.*;

Capture cam;

int w = 10;
float angle = 0;
PImage slice;

void setup() {
  size(640, 480);
  String[] cameras = Capture.list();
  cam = new Capture(this, cameras[1]);
  slice = createImage(w, height, RGB);
  cam.start();
  background(0);
}

void captureEvent(Capture cam) {
  cam.read();
}

void draw() {
  slice.copy(cam, width/2 - w/2, 0, w, height, 0, 0, w, height);
  translate(width/2, height/2);
  rotate(angle);
  image(slice, 0, 0);
  angle +=0.01;
}
