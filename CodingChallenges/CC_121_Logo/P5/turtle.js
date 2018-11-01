// Daniel Shiffman
// http://youtube.com/thecodingtrain
// http://codingtra.in

// Coding Challenge 121: Logo
// https://youtu.be/i-k04yzfMpw

class Turtle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.pen = true;

    this.home();
  }
  // Move turtle forward
  fd(amount) {
    amount = parseInt(amount, 10);
    if (this.pen) {
      stroke(255);
      strokeWeight(2);
      line(0, 0, amount, 0);
    }
    translate(amount, 0);
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
  cs(){
    background(0);
  }
  // Go back to the middle
  home() {
    this.setxy(this.x, this.y);
    this.rt(0);
  }
  // Set the X and Y of the turtle
  setxy(x, y) {
    translate(x, y);
  }
}
