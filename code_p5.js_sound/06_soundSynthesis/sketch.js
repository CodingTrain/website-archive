// Daniel Shiffman
// http://codingrainbow.com
// http://patreon.com/codingrainbow
// Code for: https://youtu.be/Bk8rLzzSink

var wave;

var button;
var slider;
var playing = false;

function setup() {
  createCanvas(100, 100);
  wave = new p5.Oscillator();
  slider = createSlider(100, 1200, 440);

  wave.setType('sine');
  wave.start();
  wave.freq(440);
  wave.amp(0);


  button = createButton('play/pause');
  button.mousePressed(toggle);
}

function draw() {
  wave.freq(slider.value());
  if (playing) {
    background(255, 0, 255);
  } else {
    background(51);
  }
}

function toggle() {
  if (!playing) {
    wave.amp(0.5, 1);
    playing = true;
  } else {
    wave.amp(0, 1);
    playing = false;
  }


}
