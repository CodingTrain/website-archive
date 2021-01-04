// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain

// Machine Learning
// Perceptron
// More: http://natureofcode.com/book/chapter-10-neural-networks/
// Video: https://youtu.be/ntKn5TPHHAk

class Point {
  constructor() {
    this.x = random(width);
    this.y = random(height);
    this.label;

    if (this.x > this.y) {
      this.label = 1;
    } else {
      this.label = -1;
    }
  }

  show() {
    stroke(0);
    if (this.label == 1) {
      fill(255);
    } else {
      fill(0);
    }
    ellipse(this.x, this.y, 16, 16);
  }
}
