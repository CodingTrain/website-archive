
class Segment {
  /* Unlike in Java, JavaScript does not implement
   * function overloading, which means we cannot simply have
   * two different constructors for our Segment class as Shiffman does in
   * his pde example. Instead, we must have one constructor function
   * which behaves differently depending on the type of arguments we pass.
   */
  constructor(point, len, i) {
    if (point.hasOwnProperty("angle")) { // point is probably a Segment

      this.par = point;
      this.a = this.par.b.copy();

    } else {

      this.par = false;
      this.a = point;

    }

    this.b = new p5.Vector();
    this.angle = 0;
    this.sw = map(i, 0, 20, 1, 10);
    this.len = len;
    this.calculateB();
  }


  follow(tx, ty) {
  /* Shiffman used function overloading here too, but since we can't
   * in JavaScript we instead check whether or not ty is undefined. */
    if (typeof(ty) == "undefined") {

      let targetX = this.child.a.x;
      let targetY = this.child.a.y;
      this.follow(targetX, targetY);

    } else {

      let target = new p5.Vector(tx, ty);
      let dir = p5.Vector.sub(target, this.a);
      this.angle = dir.heading();

      dir.setMag(this.len);
      dir.mult(-1);
      this.a = p5.Vector.add(target, dir);

    }
  }


  calculateB() {
    let dx = this.len * cos(this.angle);
    let dy = this.len * sin(this.angle)
    this.b.set(this.a.x + dx, this.a.y + dy);
  }


  update() {
    this.calculateB();
  }


  show() {
    stroke(255);
    strokeWeight(this.sw);
    line(this.a.x, this.a.y, this.b.x, this.b.y);
  }
}
