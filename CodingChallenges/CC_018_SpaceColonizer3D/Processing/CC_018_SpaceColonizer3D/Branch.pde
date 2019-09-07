// Coding Rainbow
// Daniel Shiffman
// http://patreon.com/codingtrain
// Code for: https://youtu.be/JcopTKXt8L8

class Branch {
  Branch parent;
  PVector pos;
  PVector dir;
  int count = 0;
  PVector saveDir;
  float len = 5;
  
  Branch(PVector v, PVector d) {
    parent = null;
    pos = v.copy();
    dir = d.copy();
    saveDir = dir.copy();
  }

  Branch(Branch p) {
    parent = p;
    pos = parent.next();
    dir = parent.dir.copy();
    saveDir = dir.copy();
  }

  void reset() {
    count = 0;
    dir = saveDir.copy();
  }

  PVector next() {
    PVector v = PVector.mult(dir, len);
    PVector next = PVector.add(pos, v);
    return next;
  }
}