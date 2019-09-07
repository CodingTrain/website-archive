// Daniel Shiffman
// http://youtube.com/thecodingtrain
// http://codingtra.in
// Processing transcription: Chuck England

// Coding Challenge 121: Logo
// https://youtu.be/i-k04yzfMpw
// https://editor.p5js.org/codingtrain/sketches/ryTuOf3gN

import java.util.*;

interface Command {
  void run(Turtle turtle, Object... parms);
}

Map<String, Command> commands = null;

void setupCommands() {
  commands = new HashMap<String, Command>();
  commands.put("fd", new Command() { public void run(Turtle turtle, Object... parms) { turtle.forward((int)parms[0]); } });
  commands.put("bd", new Command() { public void run(Turtle turtle, Object... parms) { turtle.forward((int)parms[0]); } });
  commands.put("rt", new Command() { public void run(Turtle turtle, Object... parms) { turtle.right((float)parms[0]); } });
  commands.put("lt", new Command() { public void run(Turtle turtle, Object... parms) { turtle.right((float)parms[0]); } });
  commands.put("pu", new Command() { public void run(Turtle turtle, Object... parms) { turtle.pen = false; } });
  commands.put("pd", new Command() { public void run(Turtle turtle, Object... parms) { turtle.pen = true; } });
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
