// Daniel Shiffman
// http://youtube.com/thecodingtrain
// http://codingtra.in

// Coding Challenge #115: Snake Game Redux
// https://youtu.be/OMoVcohRgZA

class Snake {
  ArrayList<PVector> body;
  float xdir, ydir, len;
  
  Snake() {
    this.body = new ArrayList<PVector>();
    this.body.add(new PVector(floor(w / 2), floor(h / 2)));
    this.xdir = 0;
    this.ydir = 0;
    this.len = 0;
  }

  void setDir(float x, float y) {
    this.xdir = x;
    this.ydir = y;
  }

  void update() {
    PVector head = this.body.get(this.body.size() - 1).copy();
    this.body.remove(0);
    head.x += this.xdir;
    head.y += this.ydir;
    this.body.add(head);
  }

  void grow() {
    PVector head = this.body.get(this.body.size() - 1).copy();
    this.len++;
    this.body.add(head);
  }

  boolean endGame() {
    float x = this.body.get(this.body.size() - 1).x;
    float y = this.body.get(this.body.size() - 1).y;
    if (x > w - 1 || x < 0 || y > h - 1 || y < 0) {
      return true;
    }
    for (int i = 0; i < this.body.size() - 1; i++) {
      PVector part = this.body.get(i);
      if (part.x == x && part.y == y) {
        return true;
      }
    }
    return false;
  }

  boolean eat(PVector pos) {
    float x = this.body.get(this.body.size() - 1).x;
    float y = this.body.get(this.body.size() - 1).y;
    if (x == pos.x && y == pos.y) {
      this.grow();
      return true;
    }
    return false;
  }

  void show() {
    for (int i = 0; i < this.body.size(); i++) {
      fill(0);
      noStroke();
      rect(this.body.get(i).x, this.body.get(i).y, 1, 1);
    }
  }
}
