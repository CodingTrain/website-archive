// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Video: https://youtu.be/l__fEY1xanY

var x;
var y;

function setup() {
  createCanvas(400, 400);
  x = 200;
  y = 200;
  background(51);
}

function draw() {
  stroke(255, 100);
  strokeWeight(2);
  point(x, y);

  var r = floor(random(4));

  switch (r) {
    case 0:
      x = x + 1;
      break;
    case 1:
      x = x - 1;
      break;
    case 2:
      y = y + 1;
      break;
    case 3:
      y = y - 1;
      break;
  }
}
