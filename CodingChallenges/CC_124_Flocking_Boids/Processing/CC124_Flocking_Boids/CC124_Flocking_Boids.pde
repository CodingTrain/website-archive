// Flocking
// Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/124-flocking-boids.html
// https://youtu.be/mhjuuHl6qHM
// https://editor.p5js.org/codingtrain/sketches/ry4XZ8OkN

Boid[] flock;

float alignValue = .5;
float cohesionValue = 1;
float seperationValue = 1;

void setup() {
  size(640, 360);
  int n = 200;
  flock = new Boid[n];
  for (int i = 0; i < n; i++) {
    flock[i] = new Boid();
  }
}

void draw() {
  background(51);
  for (Boid boid: flock) {
    boid.edges();
    boid.flock(flock);
    boid.update();
    boid.show();
  }
}
