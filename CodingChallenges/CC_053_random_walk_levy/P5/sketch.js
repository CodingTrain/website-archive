// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Video: https://youtu.be/bqF9w9TTfeo

// var x;
// var y;
var pos;
var prev;

function setup() {
  createCanvas(400, 400);
  background(51);
  pos = createVector(200, 200);
  prev = pos.copy();
  console.log(pos);
}

function draw() {
  stroke(255);
  strokeWeight(2);
  //point(pos.x, pos.y);
  line(pos.x, pos.y, prev.x, prev.y);
  prev.set(pos);

  var step = p5.Vector.random2D();

  var r = random(100);
  if (r < 1) {
    step.mult(random(25, 100));
  } else {
    step.setMag(2);
  }

  //pos = pos + step;
  pos.add(step);
}
