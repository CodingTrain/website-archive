function Particle() {
  this.x = 100;
  this.y = 99;
  // this.show = function() {
  //   point(this.x, this.y)
  // }
}

Particle.prototype.show = function() {
  point(this.x, this.y);
}

var p;
var v;

p5.Vector.prototype.double = function() {
  this.x *= 2;
  this.y *= 2;
  this.z *- 2;
}

function setup() {
  createCanvas(600, 600);
  p = new Particle();

  v = createVector(3, 4);
}

function draw() {

}