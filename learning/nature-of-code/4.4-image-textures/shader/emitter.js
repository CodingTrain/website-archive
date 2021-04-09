// Particle Systems with Image Textures (Shader (WEBGL))
// The Nature of Code
// The Coding Train / Daniel Shiffman / Dusk
// https://youtu.be/pUhv2CA0omA
// https://thecodingtrain.com/learning/nature-of-code/4.4-image-textures.html

// Texture Maker: https://editor.p5js.org/codingtrain/sketches/NS4rB1Yx-
// Image Texture: https://editor.p5js.org/codingtrain/sketches/TTVoNt58T
// Shader (WEBGL): https://editor.p5js.org/codingtrain/sketches/EXZmcc4m_

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

  applyForce(force) {
    for (let particle of this.particles) {
      particle.applyForce(force);
    }
  }

  update() {
    for (let particle of this.particles) {
      particle.update();
    }

    for (let i = this.particles.length - 1; i >= 0; i--) {
      if (this.particles[i].finished()) {
        this.particles.splice(i, 1);
      }
    }
  }

  show(particleData) {
    let loopMax = this.particles.length;
    if (loopMax > numParticles) {
      loopMax = numParticles;
    }
    for (let i = 0; i < loopMax; i++) {
      particleData[i].set(
        map(this.particles[i].pos.x, 0, width, 0, 1),
        map(this.particles[i].pos.y, 0, height, 0, 1),
        map(this.particles[i].lifetime, 0, 255, 0, 1)
      );
    }
    // for (let particle of this.particles) {
    //   particle.show();
    // }
  }
}
