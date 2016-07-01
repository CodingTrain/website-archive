// Daniel Shiffman
// http://codingrainbow.com
// http://patreon.com/codingrainbow
// Code for: https://youtu.be/jrk_lOg_pVA

class Spring extends VerletSpring {

  Spring(Particle a, Particle b) {
    super(a, b, w, 0.8);
  }
  
  void display() {
    stroke(255);
    strokeWeight(2);
    line(a.x, a.y, a.z, b.x, b.y, b.z);
  } 
}