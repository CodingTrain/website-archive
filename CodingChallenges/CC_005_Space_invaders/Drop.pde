// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/biN3v3ef-Y0

class Drop {
  float x, y, r;
  boolean toDelete;

  Drop(float x, float y) {
    this.x = x;
    this.y = y;
    this.r = 8;
    this.toDelete = false;
  }

  void show() {
    noStroke();
    fill(150, 0, 255);
    ellipse(this.x, this.y, this.r*2, this.r*2);
  }

  void evaporate() {
    this.toDelete = true;
  }

  boolean hits(Flower flower) {
    float d = dist(this.x, this.y, flower.x, flower.y);
    if (d < this.r + flower.r) {
      return true;
    } else {
      return false;
    }
  }

  void move() {
    this.y = this.y - 5;
  }
}
