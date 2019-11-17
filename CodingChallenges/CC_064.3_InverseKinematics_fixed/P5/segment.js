// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Video: https://youtu.be/RTc6i-7N3ms
// Transcribe to Javascript: Chuck England

class Segment {
  constructor(x, y, len, angle, id) {
    this.a = createVector(x, y);
    this.len = len;
    this.angle = angle;
    this.id = id;
    this.parent = null;
    this.reCalculate();
  }

  createParent(len, angle, id) {
    let parent = new Segment(0, 0, len, angle, id);
    this.parent = parent;
    parent.follow(this.a.x, this.a.y);
    return parent;
  }

  reCalculate() {
    let dx = cos(this.angle) * this.len;
    let dy = sin(this.angle) * this.len;
    this.b = createVector(this.a.x + dx, this.a.y + dy);
  }

  follow(tx, ty) {
    let target = createVector(tx, ty);
    let dir = p5.Vector.sub(target, this.a);
    this.angle = dir.heading();

    dir.setMag(this.len);
    dir.mult(-1);

    this.a = p5.Vector.add(target, dir);
  }

  update() {
    this.reCalculate();
  }

  show() {
    colorMode(HSB);
    let clr = color(map(this.id, 0, 39, 0, 255), 255, 255);
    colorMode(RGB);
    stroke(clr);
    strokeWeight(4);
    line(this.a.x, this.a.y, this.b.x, this.b.y);

    noStroke();
    fill(51);
    strokeWeight(2);
    ellipse(this.a.x, this.a.y, 2, 2);
    ellipse(this.b.x, this.b.y, 2, 2);
  }
}
