// Daniel Shiffman
// http://codingtra.in
// Islamic Star Patterns
// Video Part 1: https://youtu.be/sJ6pMLp_IaI
// Video Part 2: [coming soon]
// Based on: http://www.cgl.uwaterloo.ca/csk/projects/starpatterns/

// Repo with more tiling patterns and features
// https://github.com/CodingTrain/StarPatterns

function Hankin(a, v) {
  this.a = a;
  this.v = v;
  this.b = p5.Vector.add(a, v);

  this.show = function() {
    stroke(255, 0, 255);
    line(this.a.x, this.a.y, this.b.x, this.b.y);
  };
}
