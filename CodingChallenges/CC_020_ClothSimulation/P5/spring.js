// 2D Cloth with toxiclibs
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/020-cloth3d.html
// https://youtu.be/jrk_lOg_pVA
// https://editor.p5js.org/codingtrain/sketches/U6n24GfsD

class Spring extends VerletSpring2D {
  constructor(a, b) {
    super(a, b, w, 1);
  }

  display() {
    stroke(255);
    strokeWeight(2);
    line(this.a.x, this.a.y, this.b.x, this.b.y);
  }
}
