// Bezier (Cubic)
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/163-bezier.html
// https://youtu.be/zUgsYaUQNBk

// Basic: https://editor.p5js.org/codingtrain/sketches/Z53a719cQ
// Editor by Simon Tiger: https://editor.p5js.org/codingtrain/sketches/_R7RgtGfA
// bezierVertex: https://editor.p5js.org/codingtrain/sketches/O3_cLiOaw
// Time Table Cardioid with Bezier: https://editor.p5js.org/codingtrain/sketches/kZ8dpklQg
// Quadratic: https://editor.p5js.org/codingtrain/sketches/fJIMDmHcE
// Cubic: https://editor.p5js.org/codingtrain/sketches/S1Pt8lol1
// Bezier with Formula: https://editor.p5js.org/codingtrain/sketches/0XOLNHbvC

class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.dx = random(-8, 8);
    this.dy = random(-8, 8);
  }

  update() {
    this.x += this.dx;
    this.y += this.dy;

    if (this.x >= width || this.x < 0) {
      this.dx *= -1;
    }

    if (this.y >= height || this.y < 0) {
      this.dy *= -1;
    }
  }
}
