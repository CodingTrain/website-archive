// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// 1) https://youtu.be/jrk_lOg_pVA
// 2) https://youtu.be/JunJzIe0hEo
// 3) https://youtu.be/FeXnJSCFj-Q

class Spring extends VerletSpring3D {

  Spring(Particle a, Particle b) {
    super(a, b, w, 1);
  }
  
  void display() {
    stroke(255);
    strokeWeight(1);
    line(a.x, a.y, a.z, b.x, b.y, b.z);
  } 
}