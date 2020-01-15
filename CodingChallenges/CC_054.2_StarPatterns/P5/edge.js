// Daniel Shiffman
// http://codingtra.in
// Islamic Star Patterns
// Video Part 1: https://youtu.be/sJ6pMLp_IaI
// Video Part 2: [coming soon]
// Based on: http://www.cgl.uwaterloo.ca/csk/projects/starpatterns/

// Repo with more tiling patterns and features
// https://github.com/CodingTrain/StarPatterns

function Edge(a, b) {
  this.a = a;
  this.b = b;
  this.h1;
  this.h2;

  this.show = function() {
    stroke(255, 50);
    line(this.a.x, this.a.y, this.b.x, this.b.y);
    this.h1.show();
    this.h2.show();
  };

  this.hankin = function(sides) {
    var mid = p5.Vector.add(this.a, this.b);
    mid.mult(0.5);

    var v1 = p5.Vector.sub(this.a, mid);
    var v2 = p5.Vector.sub(this.b, mid);

    // Edge length
    var elen = v1.mag() + delta;

    var offset1 = mid;
    var offset2 = mid;
    if (delta > 0) {
      v1.setMag(delta);
      v2.setMag(delta);
      offset1 = p5.Vector.add(mid, v2);
      offset2 = p5.Vector.add(mid, v1);
    }
    v1.normalize();
    v2.normalize();

    v1.rotate(radians(-angle));
    v2.rotate(radians(angle));

    // Calculate interior angle
    var interior = ((sides - 2) * PI) / sides;
    // Law of sines right here!
    var alpha = interior * 0.5;
    var beta = PI - radians(angle) - alpha;
    var hlen = (elen * sin(alpha)) / sin(beta);

    v1.setMag(hlen);
    v2.setMag(hlen);

    this.h1 = new Hankin(offset1, v1);
    this.h2 = new Hankin(offset2, v2);
  };
}
