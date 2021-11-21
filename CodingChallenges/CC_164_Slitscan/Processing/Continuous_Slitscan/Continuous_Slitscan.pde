// Continuous Slitscan
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/challenges/164-time-slitscan.html

import processing.video.*;

Capture  cam;

int w = 4;
int x = 0;
PImage[] slices;
int sliceIndex = 0;
int offset = 0;

void setup() {
  size(640, 480);
  String[] cameras = Capture.list();
  cam = new Capture(this, cameras[1]);
  slices = new PImage[width/w];
  for (int i = 0; i < slices.length; i++) {
    slices[i] = createImage(w, height, RGB);
  }
  cam.start();
  background(0);
}

void captureEvent(Capture cam) {
  cam.read();
}

void draw() {
  slices[sliceIndex].copy(cam, width/2-w/2, 0, w, height, 0, 0, w, height);
  for (int i = 0; i < slices.length; i++) {
    int currentIndex = (i + offset) % slices.length;
    image(slices[currentIndex], i*w, 0);
  }
  x = (x + w) % width;

  sliceIndex = (sliceIndex + 1) % slices.length;

  offset++;
}
