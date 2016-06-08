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