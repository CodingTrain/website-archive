// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/jrk_lOg_pVA

class Particle extends VerletParticle2D {

  Particle(float x, float y) {
    super(x, y);
  }

  void display() {
    fill(255);
    ellipse(x, y, 10, 10);
  }
}