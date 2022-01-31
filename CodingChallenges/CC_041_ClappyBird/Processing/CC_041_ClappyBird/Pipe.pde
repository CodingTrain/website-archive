// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/cXgA1d_E-jY&
// Ported to Processing 4 by Spencer Stith<http://github.com/spencerstith>

class Pipe {
  float spacing = random(50, height / 2);
  float centery = random(spacing, height - spacing);

  float top = centery - spacing / 2;
  float bottom = height - (centery + spacing / 2);
  int x = width;
  int w = 50;
  int speed = 2;

  boolean highlight = false;

  boolean hits(Bird bird) {
    if (bird.y < top || bird.y > height - bottom) {
      if (bird.x > this.x && bird.x < this.x + this.w) {
        highlight = true;
        return true;
      }
    }
    highlight = false;
    return false;
  }

  void show() {
    noStroke();
    fill(255);
    if (highlight) {
      fill(255, 0, 0);
    }
    rect(x, 0, w, top);
    rect(x, height - bottom, w, bottom);
  }

  void update() {
    x -= speed;
  }

  boolean offscreen() {
    if (x < -w) {
      return true;
    } else {
      return false;
    }
  }
}
