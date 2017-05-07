// Coding Rainbow
// Daniel Shiffman
// http://patreon.com/codingtrain
// Code for: https://youtu.be/kKT0v3qhIQY

Tree tree;
float min_dist = 5;
float max_dist = 5;

void setup() {
  size(600, 600);
  tree = new Tree();
}

void draw() {
  background(51);
  tree.show();
  tree.grow();
}
