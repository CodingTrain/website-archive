// Many Particle Systems (Emitters!)
// The Nature of Code
// The Coding Train / Daniel Shiffman
// https://youtu.be/wDYD3JVtOys
// https://thecodingtrain.com/learning/nature-of-code/4.1-particle-emitters.html

// Particle Emitters: https://editor.p5js.org/codingtrain/sketches/YqAxA5CYy
// Particle Emitters with Movers Exercise: https://editor.p5js.org/codingtrain/sketches/UXmqwcpRL
// Particles Following Mouse Exercise: https://editor.p5js.org/codingtrain/sketches/1zTN6PYJg
// Particle Emitters Color Exercise: https://editor.p5js.org/codingtrain/sketches/IYisp9xmJ

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

    this.emitter = new Emitter(0, 0);
  }

  applyForce(force) {
    let f = p5.Vector.div(force, this.mass);
    this.acc.add(f);
  }

  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    //this.vel.limit(8);
    this.acc.set(0, 0);
    this.emitter.update();
    this.emitter.emit(5, this.vel);
  }

  show() {
    stroke(255);
    strokeWeight(2);
    push();

    translate(this.pos.x, this.pos.y);
    this.angle = this.vel.heading();
    this.emitter.show();
    push();
    rotate(this.angle);
    stroke(255);
    fill(200);
    triangle(-this.r, -this.r / 2, -this.r, this.r / 2, this.r, 0);
    pop();

    //line(0,0,this.r,0);
    //ellipse(0, 0, this.r * 2);
    pop();
  }
}
