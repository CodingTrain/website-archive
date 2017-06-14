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
      frog.x += attached.speed;
    }

    frog.x = constrain(x, 0, width-w);
  }

  void show() {
    fill(0, 255, 0, 200);
    rect(x, y, w, w);
  }

  void move(float xdir, float ydir) {
    x += xdir * grid;
    y += ydir * grid;
    frog.attach(null);
  }
}