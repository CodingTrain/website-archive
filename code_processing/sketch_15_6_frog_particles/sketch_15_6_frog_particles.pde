Particle[] particles;

PImage frog;
void setup() {
  size(858, 536);
  frog = loadImage("frog.jpg");

  particles = new Particle [100];
  for (int i = 0; i < particles.length; i++) {
    particles[i] = new Particle();
  }
  background(0);
}

void draw() {

  for (int i = 0; i < particles.length; i++) {
    particles[i].display();
    particles[i].move();
  }
}
