// Daniel Shiffman
// http://youtube.com/thecodingtrain
// http://codingtra.in

// Coding Challenge 121: Logo
// https://youtu.be/i-k04yzfMpw
// https://editor.p5js.org/codingtrain/sketches/ryTuOf3gN

const commands = {
  fd: function(amt) {
    turtle.forward(amt);
  },
  bd: function(amt) {
    turtle.forward(-amt);
  },
  rt: function(angle) {
    turtle.right(angle);
  },
  lt: function(angle) {
    turtle.right(-angle);
  },
  pu: function() {
    turtle.pen = false;
  },
  pd: function() {
    turtle.pen = true;
  }
};

class Turtle {
  constructor(x, y, angle) {
    this.x = x;
    this.y = y;
    this.dir = angle;
  }

  reset() {
    console.log(this.x, this.y, this.dir);
    translate(this.x, this.y);
    rotate(this.dir);
    this.pen = true;
  }

  forward(amt) {
    amt = parseInt(amt);
    if (this.pen) {
      stroke(255);
      strokeWeight(2);
      line(0, 0, amt, 0);
    }
    translate(amt, 0);
  }

  right(angle) {
    rotate(angle);
  }
}
