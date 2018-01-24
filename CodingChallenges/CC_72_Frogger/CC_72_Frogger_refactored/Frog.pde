// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain

// Frogger
// Part 1: https://youtu.be/giXV6xErw0Y
// Part 2: https://youtu.be/06-ZvYmSeus
// Part 3: https://youtu.be/hk326ZHlENQ
// Part 4: https://youtu.be/c6WdJltqEtM

class Frog extends Rectangle {

  Obstacle attached = null;

  Frog(float x, float y, float w) {
    super(x, y, w, w);
  }

  void attach(Obstacle log) {
    attached = log;
  }

  void update() {
    if (attached != null) {
      x += attached.speed;
    }

    x = constrain(x, 0, width-w);
  }

  void show() {
    fill(0, 255, 0, 200);
    rect(x, y, w, w);
  }

  void move(float xdir, float ydir) {
    x += xdir * grid;
    y += ydir * grid;
    attach(null);
  }
}
