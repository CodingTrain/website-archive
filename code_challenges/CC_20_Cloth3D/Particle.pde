// Daniel Shiffman
// http://codingrainbow.com
// http://patreon.com/codingrainbow
// Code for: https://youtu.be/jrk_lOg_pVA

class Particle extends VerletParticle {

  Particle(float x, float y, float z) {
    super(x, y, z);
  }

  void display() {
    pushMatrix();
    translate(x,y,z);
    //fill(255);
    //ellipse(x, y, 10, 10);
    popMatrix();
  }
}