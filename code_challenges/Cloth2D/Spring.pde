// Daniel Shiffman
// http://codingrainbow.com
// http://patreon.com/codingrainbow
// Code for: https://youtu.be/jrk_lOg_pVA

class Spring extends VerletSpring2D {

  Spring(Particle a, Particle b) {
    super(a, b, w, 1);
  }
  
  void display() {
    stroke(255);
    strokeWeight(2);
    line(a.x, a.y, b.x, b.y);
  } 
}