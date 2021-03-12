// Many Particle Systems (Emitters!)
// The Nature of Code
// The Coding Train / Daniel Shiffman
// https://youtu.be/wDYD3JVtOys
// https://thecodingtrain.com/learning/nature-of-code/4.1-particle-emitters.html

// Particle Emitters: https://editor.p5js.org/codingtrain/sketches/YqAxA5CYy
// Particle Emitters with Movers Exercise: https://editor.p5js.org/codingtrain/sketches/UXmqwcpRL
// Particles Following Mouse Exercise: https://editor.p5js.org/codingtrain/sketches/1zTN6PYJg
// Particle Emitters Color Exercise: https://editor.p5js.org/codingtrain/sketches/IYisp9xmJ

class Particle {
  constructor(x, y, color, vel) {
    this.pos = createVector(x, y);
    this.vel = vel.copy();
    this.vel.rotate(random(-0.6, 0.4));
    this.vel.setMag(random(-7, -2));
    this.acc = createVector(0, 0);
    this.r = 4;
    this.lifetime = 255;
    this.color = color;
  }

  finished() {
    return this.lifetime < 0;
  }

  applyForce(force) {
    this.acc.add(force);
  }

  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.set(0, 0);
    this.lifetime -= 12;
  }

  show() {
    this.color.setAlpha(this.lifetime);
    stroke(this.color);
    strokeWeight(2);
    fill(this.color);

    ellipse(this.pos.x, this.pos.y, this.r * 2);
  }
}
