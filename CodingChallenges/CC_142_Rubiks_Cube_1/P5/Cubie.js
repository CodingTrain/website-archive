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
    const r = this.len / 2;

    // When this was ported, p5.js (version 1.0.0) had not yet
    // implemented support for beginShape(QUADS) in WEBGL mode.
    // See: https://github.com/processing/p5.js/issues/4401
    // So instead, we use separate shapes for each face of the cubie.

    // z-fixed
    beginShape();
    fill(colors[BCK]);
    vertex(-r, -r, -r);
    vertex(r, -r, -r);
    vertex(r, r, -r);
    vertex(-r, r, -r);
    endShape(CLOSE);

    beginShape();
    fill(colors[FRT]);
    vertex(-r, -r, r);
    vertex(r, -r, r);
    vertex(r, r, r);
    vertex(-r, r, r);
    endShape(CLOSE);

    // y-fixed
    beginShape();
    fill(colors[DWN]);
    vertex(-r, -r, -r);
    vertex(r, -r, -r);
    vertex(r, -r, r);
    vertex(-r, -r, r);
    endShape(CLOSE);

    beginShape();
    fill(colors[UPP]);
    vertex(-r, r, -r);
    vertex(r, r, -r);
    vertex(r, r, r);
    vertex(-r, r, r);
    endShape(CLOSE);

    // x-fixed
    beginShape();
    fill(colors[LFT]);
    vertex(-r, -r, -r);
    vertex(-r, r, -r);
    vertex(-r, r, r);
    vertex(-r, -r, r);
    endShape(CLOSE);

    beginShape();
    fill(colors[RGT]);
    vertex(r, -r, -r);
    vertex(r, r, -r);
    vertex(r, r, r);
    vertex(r, -r, r);
    endShape(CLOSE);

    //box(this.len);
    pop();
  }
}
