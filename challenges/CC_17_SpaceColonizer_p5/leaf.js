// Coding Rainbow
// Daniel Shiffman
// http://patreon.com/codingrainbow
// Code for: https://youtu.be/kKT0v3qhIQY

function Leaf() {
  this.pos = createVector(random(width), random(height - 100));
  this.reached = false;

  this.show = function() {
    fill(255);
    noStroke();
    ellipse(this.pos.x, this.pos.y, 4, 4);
  }

}
