// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain

// Frogger
// Part 1: https://youtu.be/giXV6xErw0Y
// Part 2: https://youtu.be/06-ZvYmSeus
// Part 3: https://youtu.be/hk326ZHlENQ
// Part 4: https://youtu.be/c6WdJltqEtM

class Lane extends Rectangle {

  Obstacle[] obstacles;
  int col;
  int type;

  Lane(int index, color c) {
    super(0, index*grid, width, grid);
    type = SAFETY;
    obstacles = new Obstacle[0];
    col = c;
  }

  Lane(int index, int t, int n, int len, float spacing, float speed) {
    super(0, index*grid, width, grid);
    obstacles = new Obstacle[n];
    type = t;
    float offset = random(0, 200);
    for (int i = 0; i < n; i++) {
      obstacles[i] = new Obstacle(offset + spacing * i, index*grid, grid*len, grid, speed);
    }
    col = color(0);
  }


  void check(Frog frog) {
    if (type == CAR) {
      for (Obstacle o : obstacles) {
        if (frog.intersects(o)) {
          resetGame();
        }
      }
    } else if (type == LOG) {
      boolean ok = false;
      for (Obstacle o : obstacles) {
        if (frog.intersects(o)) {
          ok = true;
          frog.attach(o);
        }
      }
      if (!ok) {
        resetGame();
      }
    }
  }

  void run() {
    fill(col);
    rect(x, y, w, h);
    for (Obstacle o : obstacles) {
      o.show();
      o.update();
    }
  }
}
