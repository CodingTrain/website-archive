// Logo Part 2
// Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/121.2-logo-interpreter.html
// https://youtu.be/i-k04yzfMpw
// https://editor.p5js.org/codingtrain/sketches/BJqG8zhlN
// Processing transcription: Chuck England

import java.util.*;

interface Action {
  void run(Turtle turtle, Object... parms);
}

Map<String, Action> commandLookUp = null;

void setupCommands() {
  commandLookUp = new HashMap<String, Action>();
  commandLookUp.put("fd", new Action() { public void run(Turtle turtle, Object... parms) { turtle.forward((int)parms[0]); } });
  commandLookUp.put("bd", new Action() { public void run(Turtle turtle, Object... parms) { turtle.forward((int)parms[0]); } });
  commandLookUp.put("rt", new Action() { public void run(Turtle turtle, Object... parms) { turtle.right((float)parms[0]); } });
  commandLookUp.put("lt", new Action() { public void run(Turtle turtle, Object... parms) { turtle.right((float)parms[0]); } });
  commandLookUp.put("pu", new Action() { public void run(Turtle turtle, Object... parms) { turtle.pen = false; } });
  commandLookUp.put("pd", new Action() { public void run(Turtle turtle, Object... parms) { turtle.pen = true; } });
}

class Turtle {
  int x;
  int y;
  float dir;
  boolean pen;

  Turtle(int x_, int y_, float angle_) {
    this.x = x_;
    this.y = y_;
    this.dir = angle_;
  }

  void reset() {
    // println(this.x, this.y, this.dir);
    translate(this.x, this.y);
    rotate(radians(this.dir));
    this.pen = true;
  }

  void forward(int amt) {
    if (this.pen) {
      stroke(255);
      strokeWeight(2);
      line(0, 0, amt, 0);
    }
    translate(amt, 0);
  }

  void right(float angle) {
    rotate(radians(angle));
  }
}
