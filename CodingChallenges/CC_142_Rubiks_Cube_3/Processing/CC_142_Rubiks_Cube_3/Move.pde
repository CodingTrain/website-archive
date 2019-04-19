// Rubiks Cube 3
// Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/142.3-rubiks-cube.html
// https://youtu.be/8U2gsbNe1Uo

class Move {
  float angle = 0;
  int x = 0;
  int y = 0;
  int z = 0;
  int dir;
  boolean animating = false;
  boolean finished = false;

  Move(int x, int y, int z, int dir) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.dir = dir;
  }

  Move copy() {
    return new Move(x, y, z, dir);
  }

  void reverse() {
    if (dir != 2)
    {
      dir *= -1;
    }
  }

  void start() {
    animating = true;
    finished = false;
    this.angle = 0;
  }

  boolean finished() {
    return finished;
  }

  void update() {
    if (animating) {
      angle += dir * speed;
      if (dir == 2) {
        if (abs(angle) > PI) {
          angle = 0;
          animating = false;
          finished = true;
          if (abs(z) > 0) {
            turn(z, dir, 'z');
          } else if (abs(x) > 0) {
            turn(x, dir, 'x');
          } else if (abs(y) > 0) {
            turn(y, dir, 'y');
          }
        }
      } else {
        if (abs(angle) > HALF_PI) {
          angle = 0;
          animating = false;
          finished = true;
          if (abs(z) > 0) {
            turn(z, dir, 'z');
          } else if (abs(x) > 0) {
            turn(x, dir, 'x');
          } else if (abs(y) > 0) {
            turn(y, dir, 'y');
          }
        }
      }
    }
  }
}
