// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain

// Simple Particle System
// Edited Video: https://www.youtube.com/watch?v=UcdigVaIYAk

// Originally written using p5.js

ArrayList<Particle> particles;

void setup() {
  size(600, 400);
  particles = new ArrayList<Particle>();
}

void draw() {
  background(0);
  for (int i = 0; i < 5; i++) {
    Particle p = new Particle();
    particles.add(p);
  }
  for (int i = particles.size() - 1; i >= 0; i--) {
    Particle p = particles.get(i);
    p.update();
    p.show();
    if (p.finished()) {
      particles.remove(i);
    }
  }
}