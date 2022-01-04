// Time Displacement Slitscan
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/challenges/164-time-slitscan.html

import processing.video.*;

Capture  cam;

int h = 5;
int y = 0;
PImage[] history;
int historyIndex = 0;
int offset = 0;

void setup() {
  size(640, 480);
  String[] cameras = Capture.list();
  cam = new Capture(this, cameras[1]);
  history = new PImage[height/h];
  for (int i = 0; i < history.length; i++) {
    history[i] = createImage(cam.width, cam.height, RGB);
  }
  cam.start();
  background(0);
}

void captureEvent(Capture cam) {
  cam.read();
}

void draw() {
  for (int i = 0; i < history.length; i++) {
    int y = i * h;
    int currentIndex = (i + offset) % history.length;
    copy(history[currentIndex], 0, y, width, h, 0, y, width, h);
  }
  offset++;
  history[historyIndex].copy(cam, 0, 0, width, height, 0, 0, width, height);
  historyIndex = (historyIndex + 1) % history.length;
}
