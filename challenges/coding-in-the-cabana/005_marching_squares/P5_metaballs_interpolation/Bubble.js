// Marching Squares Metaballs Interpolation
// Coding in the Cabana
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/challenges/coding-in-the-cabana/005-marching-squares.html
// https://youtu.be/0ZONMNUKTfU
// p5 port: https://editor.p5js.org/codingtrain/sketches/hEB4588QC

class Bubble {
  constructor() {
    this.r = random(40, 60);
    this.x = random(this.r, width - this.r);
    this.y = random(this.r, height - this.r);
    this.vx = random(-2, 2);
    this.vy = random(-2, 2);
  }

  show() {
    noFill();
    stroke(255);
    fill(255, 50);
    strokeWeight(1);
    circle(this.x, this.y, this.r * 2);
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    if (this.x > width - this.r || this.x < this.r) {
      this.vx *= -1;
    }
    if (this.y > height - this.r || this.y < this.r) {
      this.vy *= -1;
    }
  }
}
