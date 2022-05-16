class Plate {
  PVector pos;
  float h;
  float w;
  Plate(float x, float w) {
    this.pos = new PVector(x, height-200 -this.h);
    this.w = w;
    this.h = 10;
  }
  void show() {
    fill(255);
    rectMode(CENTER);
    rect(this.pos.x, this.pos.y, this.w, this.h);
  }
  void update(float x) {
    this.pos.x = x;
  }
  Boolean catches(Pie pie) {
    if (pie.pos.y +pie.r >= this.pos.y && this.pos.y >0&& pie.pos.x > this.pos.x-this.w/2 && pie.pos.x < this.pos.x + this.w/2) {
      return true;
    } else {
      return false;
    }
  }
}
