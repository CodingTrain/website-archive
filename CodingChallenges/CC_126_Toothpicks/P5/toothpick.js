// Toothpicks
// Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/126-toothpicks.html
// https://youtu.be/-OL_sw2MiYw
// https://editor.p5js.org/codingtrain/sketches/SJMl3u5xN

class Toothpick {
  constructor(x, y, d) {
    this.newPick = true;

    this.dir = d;
    if (this.dir == 1) {
      this.ax = x - len / 2;
      this.bx = x + len / 2;
      this.ay = y;
      this.by = y;
    } else {
      this.ax = x;
      this.bx = x;
      this.ay = y - len / 2;
      this.by = y + len / 2;
    }
  }

  intersects(x, y) {
    if (this.ax == x && this.ay == y) {
      return true;
    } else if (this.bx == x && this.by == y) {
      return true;
    } else {
      return false;
    }
  }

  createA(others) {
    let available = true;
    for (let other of others) {
      if (other != this && other.intersects(this.ax, this.ay)) {
        available = false;
        break;
      }
    }
    if (available) {
      return new Toothpick(this.ax, this.ay, this.dir * -1);
    } else {
      return null;
    }
  }

  createB(others) {
    let available = true;
    for (let other of others) {
      if (other != this && other.intersects(this.bx, this.by)) {
        available = false;
        break;
      }
    }
    if (available) {
      return new Toothpick(this.bx, this.by, this.dir * -1);
    } else {
      return null;
    }
  }

  show(factor) {
    stroke(2 / factor);
    if (this.newPick) {
      stroke(0, 0, 255);
    }
    strokeWeight(2);
    line(this.ax, this.ay, this.bx, this.by);
  }
}
