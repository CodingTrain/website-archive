class Particle extends VerletParticle2D {

  Particle(float x, float y) {
    super(x, y);
  }

  void display() {
    fill(255);
    ellipse(x, y, 10, 10);
  }
}