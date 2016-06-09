// Daniel Shiffman
// http://codingrainbow.com
// http://patreon.com/codingrainbow
// Code for: https://youtu.be/YcezEwOXun4

var song;
var button;

function setup() {
  createCanvas(200, 200);
  song = loadSound("rainbow.mp3", loaded);
  button = createButton("play");
  button.mousePressed(togglePlaying);
  background(51);
}

function togglePlaying() {
  if (!song.isPlaying()) {
    song.play();
    song.setVolume(0.3);
    button.html("pause");
  } else {
    song.stop();
    button.html("play");
  }
}

function loaded() {
  console.log("loaded");
}
