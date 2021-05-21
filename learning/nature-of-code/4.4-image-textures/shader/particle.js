// Particle Systems with Image Textures (Shader (WEBGL))
// The Nature of Code
// The Coding Train / Daniel Shiffman / Dusk
// https://youtu.be/pUhv2CA0omA
// https://thecodingtrain.com/learning/nature-of-code/4.4-image-textures.html

// Texture Maker: https://editor.p5js.org/codingtrain/sketches/NS4rB1Yx-
// Image Texture: https://editor.p5js.org/codingtrain/sketches/TTVoNt58T
// Shader (WEBGL): https://editor.p5js.org/codingtrain/sketches/EXZmcc4m_

class Particle {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = p5.Vector.random2D();
    this.vel.mult(random(0.5, 2));
    this.acc = createVector(0, 0);
    this.r = 64;
    this.lifetime = 255;
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

    this.lifetime -= 5;
  }

  // show() {
  //   tint(150, 40, 80, this.lifetime);
  //   imageMode(CENTER);
  //   image(img, this.pos.x, this.pos.y, this.r, this.r);
  //   // ellipse(this.pos.x, this.pos.y, this.r * 2);
  // }
}
