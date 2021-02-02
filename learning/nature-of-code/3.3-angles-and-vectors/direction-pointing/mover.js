// Angles and Vectors (Direction Pointing)
// The Nature of Code
// The Coding Train / Daniel Shiffman
// https://youtu.be/oXwCVDXS2Lg
// https://thecodingtrain.com/learning/nature-of-code/3.3-angles-and-vectors.html

// Direction Pointing: https://editor.p5js.org/codingtrain/sketches/9M9yQJVVc
// Vehicle: https://editor.p5js.org/codingtrain/sketches/HtXbIDsESi
// Asteroids Exercise: https://editor.p5js.org/codingtrain/sketches/pXS395i0h

class Mover {
  constructor(x, y, m) {
    this.pos = createVector(x, y);
    this.vel = p5.Vector.random2D();
    this.vel.mult(5);
    this.acc = createVector(0, 0);
    this.mass = m;
    this.r = sqrt(this.mass) * 2;

    this.angle = 0;
    this.angleV = 0;
    this.angleA = 0;
  }

  applyForce(force) {
    let f = p5.Vector.div(force, this.mass);
    this.acc.add(f);
  }

  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);

    //this.angleA = this.acc.y / 50.0;

    //this.angleV += this.angleA;
    //this.angle += this.angleV;

    this.acc.set(0, 0);
  }

  show() {
    stroke(255);
    strokeWeight(2);
    fill(255, 100);
    push();
    translate(this.pos.x, this.pos.y);
    this.angle = this.vel.heading();
    rotate(this.angle);
    triangle(-this.r, -this.r / 2, -this.r, this.r / 2, this.r, 0);

    //line(0,0,this.r,0);
    //ellipse(0, 0, this.r * 2);
    pop();
  }
}
