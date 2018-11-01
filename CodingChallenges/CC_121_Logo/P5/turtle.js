// Daniel Shiffman
// http://youtube.com/thecodingtrain
// http://codingtra.in

// Coding Challenge 121: Logo
// https://youtu.be/i-k04yzfMpw

class Turtle {
  constructor(x, y) {
    this.setxy(x, y);
  }
  init() {
    this.cs();
    this.rt(0);
    this.pd();
  }
  // Move turtle forward
  fd(amount) {
    amount = parseInt(amount, 10);
    if (this.pen) {
      stroke(255);
      strokeWeight(2);
      line(0, 0, amount, 0);
    }
    this.setxy(amount, 0);
  }
  // Move turtle backward
  bd(amount) {
    this.fd(-amount);
  }
  // Rotate turtle right by degrees
  rt(angle) {
    rotate(angle);
  }
  // Rotate turtle left by degrees
  lt(angle) {
    this.rt(-angle);
  }
  // Don't let turtle spill ink
  pu() {
    this.pen = false;
  }
  // Turtle may ink his path
  pd() {
    this.pen = true;
  }
  // Clear the screen
  cs() {
    background(0);
  }
  // Go back to the middle
  home() {
    pop();
    push();
    this.rt(0);
  }
  // Translate turtle to x and y
  setxy(x, y) {
    translate(x, y);
  }
}
