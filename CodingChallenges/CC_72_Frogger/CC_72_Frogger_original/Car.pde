// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain

// Frogger
// Part 1: https://youtu.be/giXV6xErw0Y
// Part 2: https://youtu.be/06-ZvYmSeus
// Part 3: https://youtu.be/hk326ZHlENQ
// Part 4: https://youtu.be/c6WdJltqEtM

class Car extends Rectangle {
  float speed;

  Car(float x, float y, float w, float h, float s) {
    super(x, y, w, h);
    speed = s;
  }

  void update() {
    x = x + speed;
    if (speed > 0 && x > width+grid) {
      x = -w-grid;
    } else if (speed < 0 && x < -w-grid) {
      x = width+grid;
    }
  }

  void show() {
    fill(200);
    rect(x, y, w, h);
  }
}
