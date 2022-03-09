// Time Displacement Slitscan
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/challenges/164-time-slitscan.html

import processing.video.*;

Capture  cam;

int w = 5;
int x = 0;
PImage[] history;
int historyIndex = 0;
int offset = 0;

void setup() {
  size(640, 480);
  String[] cameras = Capture.list();
  cam = new Capture(this, cameras[1]);
  history = new PImage[width/w];
  for (int i = 0; i < history.length; i++) {
    history[i] = createImage(width, height, RGB);
  }
  cam.start();
  background(0);
}

void captureEvent(Capture cam) {
  cam.read();
}

void draw() {
  for (int i = 0; i < history.length; i++) {
    int x = i * w;
    int currentIndex = (i + offset) % history.length;
    copy(history[currentIndex], x, 0, w, height, x, 0, w, height);
  }
  offset++;
  history[historyIndex].copy(cam, 0, 0, width, height, 0, 0, width, height);
  historyIndex = (historyIndex + 1) % history.length;
}
