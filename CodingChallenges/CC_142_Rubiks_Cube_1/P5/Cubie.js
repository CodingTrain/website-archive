// Rubiks Cube 1
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/142.1-rubiks-cube.html
// https://youtu.be/9PGfL4t-uqE

class Cubie {
  constructor(x, y, z, len_) {
    this.pos = createVector(x, y, z);
    this.len = len_;
  }
  show() {
    fill(255);
    stroke(0);
    strokeWeight(8);
    push();
    translate(this.pos.x, this.pos.y, this.pos.z);
    beginShape(QUADS);
    const r = this.len / 2;

    // z-fixed
    fill(colors[BCK]);
    vertex(-r, -r, -r);
    vertex(r, -r, -r);
    vertex(r, r, -r);
    vertex(-r, r, -r);

    fill(colors[FRT]);
    vertex(-r, -r, r);
    vertex(r, -r, r);
    vertex(r, r, r);
    vertex(-r, r, r);

    // y-fixed
    fill(colors[DWN]);
    vertex(-r, -r, -r);
    vertex(r, -r, -r);
    vertex(r, -r, r);
    vertex(-r, -r, r);

    fill(colors[UPP]);
    vertex(-r, r, -r);
    vertex(r, r, -r);
    vertex(r, r, r);
    vertex(-r, r, r);

    // x-fixed
    fill(colors[LFT]);
    vertex(-r, -r, -r);
    vertex(-r, r, -r);
    vertex(-r, r, r);
    vertex(-r, -r, r);

    fill(colors[RGT]);
    vertex(r, -r, -r);
    vertex(r, r, -r);
    vertex(r, r, r);
    vertex(r, -r, r);

    endShape();

    //box(this.len);
    pop();
  }
}
