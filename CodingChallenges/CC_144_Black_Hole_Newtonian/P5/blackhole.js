// Daniel Shiffman
// https://thecodingtrain.com/
// https://youtu.be/Iaz9TqYWUmA
// https://editor.p5js.org/codingtrain/sketches/2zZqSkxtj

// Thanks to Veritasium
// https://youtu.be/zUyH3XhpLTo
// and Chris Orban / STEM Coding
// https://www.asc.ohio-state.edu/orban.14/stemcoding/blackhole.html

// Accounting for relativity:
// https://editor.p5js.org/codingtrain/sketches/4DvaeH0Ur

class Blackhole {
  constructor(x, y, m) {
    this.pos = createVector(x, y);
    this.mass = m;
    this.rs = (2 * G * this.mass) / (c * c);
  }

  pull(photon) {
    const force = p5.Vector.sub(this.pos, photon.pos);
    const r = force.mag();
    const fg = (G * this.mass) / (r * r);
    force.setMag(fg);
    photon.vel.add(force);
    photon.vel.setMag(c);

    if (r < this.rs) {
      photon.stop();
    }
  }

  show() {
    ellipseMode(RADIUS);
    fill(0);
    noStroke();
    ellipse(this.pos.x, this.pos.y, this.rs);

    noFill();
    stroke(100, 100);
    strokeWeight(64);
    ellipse(this.pos.x, this.pos.y, this.rs * 3 + 32);

    stroke(255, 150, 0, 100);
    strokeWeight(32);

    ellipse(this.pos.x, this.pos.y, this.rs * 1.5 + 16);
  }
}
