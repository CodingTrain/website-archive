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

class Photon {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = createVector(-c, 0);
    this.history = [];
    this.stopped = false;
    this.theta = 0;
  }

  stop() {
    this.stopped = true;
  }

  update() {
    if (!this.stopped) {
      //if (frameCount % 5 == 0) {
      this.history.push(this.pos.copy());
      //}
      const deltaV = this.vel.copy();
      deltaV.mult(dt);
      this.pos.add(deltaV);
    }

    if (this.history.length > 500) {
      this.history.splice(0, 1);
    }
  }

  show() {
    strokeWeight(4);
    stroke(255, 0, 0);
    point(this.pos.x, this.pos.y);

    strokeWeight(2);
    noFill();
    beginShape();
    for (let v of this.history) {
      vertex(v.x, v.y);
    }

    endShape();
  }
}
