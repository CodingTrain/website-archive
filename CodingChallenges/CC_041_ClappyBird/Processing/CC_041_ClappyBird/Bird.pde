// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/cXgA1d_E-jY&
// Ported to Processing 4 by Spencer Stith<http://github.com/spencerstith>

class Bird {
  int y = height / 2;
  int x = 64;

  float gravity = 0.6;
  float lift = -15;
  float velocity = 0;

  void show() {
    fill(255);
    noStroke();
    ellipse(x, y, 32, 32);
  }

  void up() {
    velocity += lift;
  }

  void update() {
    velocity += gravity;
    velocity *= 0.9;
    y += velocity;

    if (y > height) {
      y = height;
      velocity = 0;
    }

    if (y < 0) {
      y = 0;
      velocity = 0;
    }
  };
}
