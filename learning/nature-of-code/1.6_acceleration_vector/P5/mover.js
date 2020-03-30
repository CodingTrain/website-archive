// Acceleration Vector
// The Nature of Code
// The Coding Train / Daniel Shiffman
// https://youtu.be/T84AWnntxZA
// https://thecodingtrain.com/learning/nature-of-code/1.6-acceleration-vector.html
// https://editor.p5js.org/codingtrain/sketches/OjCfrdWX

class Mover {
  constructor(x, y) {
    this.pos = createVector(x, y);
    // this.vel = createVector(1, -1);
    this.vel = p5.Vector.random2D();
    this.vel.mult(random(3));
  }

  update() {
    let mouse = createVector(mouseX, mouseY);
    this.acc = p5.Vector.sub(mouse, this.pos);
    this.acc.setMag(1);

    this.vel.add(this.acc);
    this.vel.limit(5);

    this.pos.add(this.vel);
  }

  show() {
    stroke(255);
    strokeWeight(2);
    fill(255, 100);
    ellipse(this.pos.x, this.pos.y, 32);
  }
}
