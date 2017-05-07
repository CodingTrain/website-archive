// Daniel Shiffman
// http://codingtra.in
// Butterfly Wings
// Video: [coming soon]

var yoff = 0;

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(51);
  translate(width / 2, height / 2);
  rotate(PI / 2);

  stroke(255);
  fill(255, 50);
  strokeWeight(1);

  var da = PI / 200;
  var dx = 0.05;

  var xoff = 0;
  beginShape();
  for (var a = 0; a <= TWO_PI; a += da) {
    var n = noise(xoff, yoff);
    var r = sin(2 * a) * map(n, 0, 1, 50, 300);
    var x = r * cos(a);
    var y = r * sin(a);
    if (a < PI / 2){
        xoff += dx; 
    } else{
        xoff -= dx; 
    }
    //point(x, y);
    vertex(x, y);
  }
  endShape();

  yoff += 0.01;
}
