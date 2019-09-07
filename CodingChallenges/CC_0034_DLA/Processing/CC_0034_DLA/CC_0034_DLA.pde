// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for this video: https://youtu.be/Cl_Gjj80gPE
// Processing transcription: Chuck England

import java.util.*;

List<Walker> tree = new ArrayList<Walker>();
List<Walker> walkers = new ArrayList<Walker>();
//float r = 4;
int maxWalkers = 50;
int iterations = 1000;
float radius = 12;
float hue = 0;
float shrink = 0.995;

void setup() {
  size(600, 600);
  colorMode(HSB, 360, 100, 100);
  // for (int x = 0; x < width; x += r * 2) {
  //   tree.add(new Walker(x, height));
  // }

  tree.add(new Walker(width / 2, height / 2));
  radius *= shrink;
  for (int i = 0; i < maxWalkers; i++) {
    walkers.add(new Walker());
    radius *= shrink;
  }
}

void draw() {
  background(0);

  for (int i = 0; i < tree.size(); i++) {
    tree.get(i).show();
  }

  for (int i = 0; i < walkers.size(); i++) {
    walkers.get(i).show();
  }

  for (int n = 0; n < iterations; n++) {
    for (int i = walkers.size() - 1; i >= 0; i--) {
      Walker walker = walkers.get(i);
      walker.walk();
      if (walker.checkStuck(tree)) {
        walker.setHue(hue % 360);
        hue += 2;
        tree.add(walker);
        walkers.remove(i);
      }
    }
  }

  //float r = walkers.get(walkers.size() - 1).r;
  while (walkers.size() < maxWalkers && radius > 1) {
    radius *= shrink;
    walkers.add(new Walker());
  }
}
