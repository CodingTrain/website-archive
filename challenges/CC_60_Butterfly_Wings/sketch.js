// Daniel Shiffman
// http://codingtra.in
// Butterfly Wings
// Video: [coming soon]

var angle = 0;
function preload(){
  song = loadSound('thisdot.mp3');
}
function setup() {
  createCanvas(400, 400);
  fft = new p5.FFT();
  song.loop();
  song.amp(0.2);
}

function draw() {
  var spectrum = fft.analyze(16, 'db');
  background(51);
  translate(width / 2, height / 2);
  rotate(angle);
  noStroke();
  fill(255, 0, 255, 100);

  var da = PI / 8;

  var xoff = 0;
  beginShape();
  for (var a = -PI / 2; a <= 3 * PI / 2; a += da) {
    for (var i = 0; i < spectrum.length; i++){
      var r = map(spectrum[i], -140, 0, 100, 200);
      var x = r * cos(a);
      var y = r * sin(a);
      vertex(x, y);
    }
  }
  endShape(CLOSE);
  angle += PI / 480;
}
