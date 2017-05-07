var flock;
var txt;
var frameCounter = 0;

function setup() {
  createCanvas(640, 360);
  resetSketch();
  var button = createButton("reset");
  button.mousePressed(resetSketch);
  txt = createP('0');
  txt.style('font-size','32pt');
}

function resetSketch() {
  frameCounter = 0;
  flock = new Flock();
  for (var i = 0; i < 100; i++) {
    var b = new Boid(width / 2, height / 2);
    flock.addBoid(b);
  }
}

function draw() {
  background(51);
  flock.run();
  txt.html(frameCounter );
  frameCounter++;
}