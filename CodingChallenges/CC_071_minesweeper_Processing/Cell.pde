// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain

// Minesweeper
// Video: https://youtu.be/LFU5ZlrR21E

// Originally written using p5.js

class Cell {
  int i;
  int j;
  int x;
  int y;
  int w;
  int neighborCount;
  boolean bee;
  boolean revealed;
  
  Cell(int i_, int j_, int w_) {
    i = i_;
    j = j_;
    x = i * w_;
    y = j * w_;
    w = w_;
    neighborCount = 0;
    
    bee = false;
    revealed = false;
  }
  
  void show() {
    stroke(0);
    noFill();
    rect(x, y, w, w);
    if (revealed) {
      if (bee) {
        fill(127);
        ellipse(x + w * 0.5, y + w * 0.5, w * 0.5, w * 0.5);
      } else {
        fill(200);
        rect(x, y, w, w);
        if (neighborCount > 0) {
          textAlign(CENTER);
          fill(0);
          text(neighborCount, x + w * 0.5, y + w - 6);
        }
      }
    }
  }
  
  void countBees() {
    if (bee) {
      neighborCount = -1;
      return;
    }
    int total = 0;
    for (int xoff = -1; xoff <= 1; xoff++) {
      int celli = i + xoff;
      if (celli < 0 || celli >= cols) continue;
  
      for (int yoff = -1; yoff <= 1; yoff++) {
        int cellj = j + yoff;
        if (cellj < 0 || cellj >= rows) continue;
  
        Cell neighbor = grid[celli][cellj];
        if (neighbor.bee) {
          total++;
        }
      }
    }
    neighborCount = total;
  }
  
  boolean contains(int x_, int y_) {
    return (x_ > x && x_ < x + w && y_ > y && y_ < y + w);
  }
  
  void reveal() {
    revealed = true;
    if (neighborCount == 0) {
      // flood fill time
      floodFill();
    }
  }
  
  void floodFill() {
    for (int xoff = -1; xoff <= 1; xoff++) {
      int celli = i + xoff;
      if (celli < 0 || celli >= cols) continue;
  
      for (int yoff = -1; yoff <= 1; yoff++) {
        int cellj = j + yoff;
        if (cellj < 0 || cellj >= rows) continue;
  
        Cell neighbor = grid[celli][cellj];
        // Note the neighbor.bee check was not required.
        // See issue #184
        if (!neighbor.revealed) {
          neighbor.reveal();
        }
      }
    }
  }
}