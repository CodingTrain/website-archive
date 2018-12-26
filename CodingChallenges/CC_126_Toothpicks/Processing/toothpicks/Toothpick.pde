// Toothpicks
// Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/126-toothpicks.html
// https://youtu.be/-OL_sw2MiYw
// https://editor.p5js.org/codingtrain/sketches/SJMl3u5xN

class Toothpick {
  int ax, ay, bx, by;
  int dir;
  boolean newPick = true;

  Toothpick(int x, int y, int d) {
    dir = d;
    if (dir == 1) {
      ax = x - len/2; 
      bx = x + len/2; 
      ay = y;
      by = y;
    } else {
      ax = x; 
      bx = x; 
      ay = y- len/2;
      by = y+ len/2;
    }
  }


  boolean intersects(int x, int y) {
    if (ax == x && ay == y) {
      return true;
    } else if (bx == x && by == y) {
      return true;
    } else {
      return false;
    }
  }



  Toothpick createA(ArrayList<Toothpick> others) {
    boolean available = true;
    for (Toothpick other : others) {
      if (other != this && other.intersects(ax, ay)) {
        available = false;
        break;
      }
    }
    if (available) {
      return new Toothpick(ax, ay, dir*-1);
    } else {
      return null;
    }
  }

  Toothpick createB(ArrayList<Toothpick> others) {
    boolean available = true;
    for (Toothpick other : others) {
      if (other != this && other.intersects(bx, by)) {
        available = false;
        break;
      }
    }
    if (available) {
      return new Toothpick(bx, by, dir*-1);
    } else {
      return null;
    }
  }

  void show(float factor) {
    stroke(2/factor);
    if (newPick) {
      stroke(0, 0, 255);
    }
    strokeWeight(2);
    line(ax, ay, bx, by);
  }
}
