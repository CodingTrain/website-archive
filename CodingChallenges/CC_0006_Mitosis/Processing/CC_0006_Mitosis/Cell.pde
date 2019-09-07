// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/jxGS3fKPKJA

class Cell {
  PVector pos;
  float r;
  color c;

  Cell(PVector pos, float r, color c) {
    this.pos = pos.copy();
    this.r = r;
    this.c = c;
  }

  Cell() {
    this.pos  = new PVector(random(width), random(height));
    this.r = 60;
    this.c =  color(random(100, 255), 0, random(100, 255), 100);
  }


  boolean clicked(int x, int y) {
    float d = dist(this.pos.x, this.pos.y, x, y);
    if (d < this.r) {
      return true;
    } else {
      return false;
    }
  }

  Cell mitosis() {
    Cell cell = new Cell(this.pos, this.r*0.8, this.c);
    return cell;
  }

  void move() {
    PVector vel = PVector.random2D();
    this.pos.add(vel);
  }

  void show() {
    noStroke();
    fill(this.c);
    ellipse(this.pos.x, this.pos.y, this.r, this.r);
  }
}
