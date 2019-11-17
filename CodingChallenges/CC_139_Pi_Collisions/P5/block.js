// Pi Day Collisions
// Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/139-pi-collisions.html
// https://youtu.be/PoW8g67XNxA
// https://editor.p5js.org/codingtrain/sketches/4FuKfd-LJ

class Block {
  constructor(x, w, m, v, xc) {
    this.x = x;
    this.y = height - w;
    this.w = w;
    this.v = v;
    this.m = m;
    this.xConstraint = xc;
  }

  hitWall() {
    return this.x <= 0;
  }

  reverse() {
    this.v *= -1;
  }

  collide(other) {
    return !(this.x + this.w < other.x || this.x > other.x + other.w);
  }

  bounce(other) {
    let sumM = this.m + other.m;
    let newV = ((this.m - other.m) / sumM) * this.v;
    newV += ((2 * other.m) / sumM) * other.v;
    return newV;
  }

  update() {
    this.x += this.v;
  }

  show() {
    const x = constrain(this.x, this.xConstraint, width);
    image(blockImg, x, this.y, this.w, this.w);
  }
}
