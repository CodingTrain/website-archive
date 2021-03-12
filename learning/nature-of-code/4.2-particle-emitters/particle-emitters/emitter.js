// Many Particle Systems (Emitters!)
// The Nature of Code
// The Coding Train / Daniel Shiffman
// https://youtu.be/wDYD3JVtOys
// https://thecodingtrain.com/learning/nature-of-code/4.1-particle-emitters.html

// Particle Emitters: https://editor.p5js.org/codingtrain/sketches/YqAxA5CYy
// Particle Emitters with Movers Exercise: https://editor.p5js.org/codingtrain/sketches/UXmqwcpRL
// Particles Following Mouse Exercise: https://editor.p5js.org/codingtrain/sketches/1zTN6PYJg
// Particle Emitters Color Exercise: https://editor.p5js.org/codingtrain/sketches/IYisp9xmJ

class Emitter {
  constructor(x, y) {
    this.position = createVector(x, y);
    this.particles = [];
  }

  emit(num) {
    for (let i = 0; i < num; i++) {
      this.particles.push(new Particle(this.position.x, this.position.y));
    }
  }

  update() {
    for (let particle of this.particles) {
      let gravity = createVector(0, 0.2);
      particle.applyForce(gravity);
      particle.update();
    }

    for (let i = this.particles.length - 1; i >= 0; i--) {
      if (this.particles[i].finished()) {
        this.particles.splice(i, 1);
      }
    }
  }

  show() {
    for (let particle of this.particles) {
      particle.show();
    }
  }
}
