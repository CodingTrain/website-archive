// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/wUSva_BnedA

var wave;
var button;
var playing = false;

var env;

function setup() {
  createCanvas(100, 100);

  env = new p5.Env();
  env.setADSR(0.05, 0.1, 0.5, 1);
  env.setRange(1.2, 0);

  wave = new p5.Oscillator();

  wave.setType('sine');
  wave.start();
  wave.freq(440);
  wave.amp(env);



  button = createButton('play');
  button.mousePressed(toggle);
}

function draw() {
  if (playing) {
    background(255, 0, 255);
  } else {
    background(51);
  }
}

function toggle() {
  env.play();

  // if (!playing) {
  //   wave.amp(0.5, 1);
  //   playing = true;
  // } else {
  //   wave.amp(0, 1);
  //   playing = false;
  // }


}
