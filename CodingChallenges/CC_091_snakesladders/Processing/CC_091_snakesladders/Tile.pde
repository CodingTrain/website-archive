// Daniel Shiffman
// Snakes and Ladders
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/JrRO3OnWs5s
// Processing transcription: Chuck England

// Each tile on the board
class Tile {
  float x;
  float y;
  float wh;
  int index;
  int next;
  int snadder = 0;
  color clr;

  Tile(float x_, float y_, float wh_, int index_, int next_) {
    x = x_;
    y = y_;
    wh = wh_;
    // index and next
    // TODO: (next is probably redundant?)
    index = index_;
    next = next_;
    snadder = 0;
    // Checkboard pattern
    if (index % 2 == 0) {
      clr = 200;
    } else {
      clr = 100;
    }
  }

  // Find center
  PVector getCenter() {
    float cx = x + wh / 2;
    float cy = y + wh / 2;
    return new PVector(cx, cy);
  } 

  // Draw rectangle
  void show() {
    fill(clr);
    noStroke();
    rect(x, y, wh, wh);
  }

  // Highlight over rectangle
  void highlight() {
    fill(0, 0, 255, 100);
    noStroke();
    rect(x, y, wh, wh);
  }

  // If it's connected to another tile
  // with a snake or a ladder
  void showSnadders() {
    if (snadder != 0) {
      PVector myCenter = getCenter();
      PVector nextCenter = tiles.get(index + snadder).getCenter();
      strokeWeight(4);
      if (snadder < 0) {
        stroke(255, 0, 0, 200);
      } else {
        stroke(0, 255, 0, 200);
      }
      line(myCenter.x, myCenter.y, nextCenter.x, nextCenter.y);
    }
  }
}
