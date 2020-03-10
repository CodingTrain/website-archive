// Getting Started with Vector Math
// The Nature of Code
// The Coding Train / Daniel Shiffman
// https://youtu.be/Rob0pbE7kks
// https://thecodingtrain.com/learning/nature-of-code/1.2-vector-math.html
// https://editor.p5js.org/codingtrain/sketches/GGn5cd-z

class Walker {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = createVector(1, -1);
  }

  update() {
    this.pos.add(this.vel);
  }

  show() {
    stroke(255);
    strokeWeight(2);
    fill(255, 100);
    ellipse(this.pos.x, this.pos.y, 32);
  }
}
