// Coding Rainbow
// Daniel Shiffman
// http://patreon.com/codingrainbow
// Code for: https://youtu.be/kKT0v3qhIQY

import peasy.*;

Tree tree;
float min_dist = 5;
float max_dist = 50;

PeasyCam cam;

void setup() {
  size(600, 600, P3D);
  cam = new PeasyCam(this, 600);
  tree = new Tree();
}

void draw() {
  background(51);
  lights();
  tree.show();
  tree.grow();
}
