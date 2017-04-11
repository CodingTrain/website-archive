// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Fractal Spirograph
// Video: https://youtu.be/0dwJ-bkJwDI

var k = -4;

function Orbit(x_, y_, r_, n, p) {
  this.x = x_;
  this.y = y_;
  this.r = r_;
  this.parent = p;
  this.child = null;
  this.speed = (radians(pow(k, n-1)))/resolution;
  this.angle = -PI/2;

  this.addChild = function() {
    var newr = this.r / 3.0;
    var newx = this.x + this.r + newr;
    var newy = this.y;
    this.child = new Orbit(newx, newy, newr, n+1, this);
    return this.child;
  }

  this.update = function() {
    var parent = this.parent;
    if (parent != null) {
      this.angle += this.speed;
      var rsum = this.r + parent.r;
      this.x = parent.x + rsum * cos(this.angle);
      this.y = parent.y + rsum * sin(this.angle);
    }
  }

  this.show = function() {
    stroke(255, 100);
    strokeWeight(1);
    noFill();
    ellipse(this.x, this.y, this.r*2, this.r*2);
  }
}
