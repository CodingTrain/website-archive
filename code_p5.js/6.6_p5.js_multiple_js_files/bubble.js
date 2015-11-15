
function Bubble(x, y) {
  this.x = x;
  this.y = y;

  this.display = function() {
    stroke(255);
    fill(255, 150);
    ellipse(this.x, this.y, 48, 48);
  }

  this.move = function() {
    this.x = this.x + random(-1, 1);
    this.y = this.y + random(-1, 1);

  }
}