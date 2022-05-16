class Plate {
  constructor(x, w) {
    this.x = x;
    this.w = w;
    this.h = 10;
    this.y = height - this.h;
  }

  catches(pie) {
    if (pie.y + pie.r >= this.y && pie.x > this.x-this.w/2 && pie.x < this.x + this.w/2) {
      return true;
    } else {
      return false;
    }
  }

  show() {
    fill(255);
    rectMode(CENTER);
    rect(this.x, this.y, this.w, this.h);
  }
}
