// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/r0lvsMPGEoY

class Blob {
  constructor(x, y) {
    this.minx = x;
    this.miny = y;
    this.maxx = x;
    this.maxy = y;
    this.taken = false;
    this.id = 0;
  }

  show() {
    stroke(0);
    fill(255, 100);
    strokeWeight(2);
    rectMode(CORNERS);
    rect(this.minx, this.miny, this.maxx, this.maxy);

    textAlign(CENTER);
    textSize(64);
    fill(0);
    text(this.id, this.minx + (this.maxx - this.minx) * 0.5, this.maxy - 10);
  }

  add(x, y) {
    this.minx = min(this.minx, x);
    this.miny = min(this.miny, y);
    this.maxx = max(this.maxx, x);
    this.maxy = max(this.maxy, y);
  }

  become(other) {
    this.minx = other.minx;
    this.maxx = other.maxx;
    this.miny = other.miny;
    this.maxy = other.maxy;
  }

  size() {
    return (this.maxx - this.minx) * (this.maxy - this.miny);
  }

  getCenter() {
    const x = (this.maxx - this.minx) * 0.5 + this.minx;
    const y = (this.maxy - this.miny) * 0.5 + this.miny;
    return createVector(x, y);
  }

  isNear(x, y) {
    const cx = max(min(x, this.maxx), this.minx);
    const cy = max(min(y, this.maxy), this.miny);
    const d = distSq(cx, cy, x, y);
    if (d < distThreshold * distThreshold) {
      return true;
    } else {
      return false;
    }
  }
}
