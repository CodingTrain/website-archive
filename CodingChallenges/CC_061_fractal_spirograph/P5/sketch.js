// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Fractal Spirograph
// Video: https://youtu.be/0dwJ-bkJwDI

var path = [];

var angle = 0;
var resolution = 50;

var sun;
var end;

function setup() {
  createCanvas(600, 600);
  sun = new Orbit(width / 2, height / 2, width / 4, 0);
  var next = sun;
  for (var i = 0; i < 10; i++) {
    next = next.addChild();
  }
  end = next;
}

function draw() {
  background(51);

  for (var i = 0; i < resolution; i++) {
    var next = sun;
    while (next != null) {
      next.update();
      next = next.child;
    }
    path.push(createVector(end.x, end.y));
  }

  var next = sun;
  while (next != null) {
    next.show();
    next = next.child;
  }

  beginShape();
  stroke(255, 0, 255);
  noFill();
  for (var pos of path) {
    vertex(pos.x, pos.y);
  }
  endShape();
}
