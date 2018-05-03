// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for this video: https://youtu.be/LG8ZK-rRkXo

function Box(x, y, z, r) {
  this.pos = createVector(x, y, z);
  this.r = r;

  this.generate = function() {
    var boxes = [];
    for (var x = -1; x < 2; x++) {
      for (var y = -1; y < 2; y++) {
        for (var z = -1; z < 2; z++) {
          var sum = abs(x) + abs(y) + abs(z);
          var newR = this.r / 3;
          if (sum > 1) {
            var b = new Box(this.pos.x + x * newR, this.pos.y + y * newR, this.pos.z + z * newR, newR);
            boxes.push(b);
          }
        }
      }
    }
    return boxes;
  }

  this.show = function() {
    push();
    translate(this.pos.x, this.pos.y, this.pos.z);
    //stroke(255);
    //noStroke();
    //noFill();
    //fill(255);
    box(this.r);
    pop();
  }
}
