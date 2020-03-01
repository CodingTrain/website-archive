// May the 4th Scrolling Text
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/101-may-the-4th.html
// https://youtu.be/fUkF-YLLXeg

let font;
let lines;
let txt;

let y = 0;

function preload() {
  lines = loadStrings('space.txt');
  font = loadFont('AvenirNextLTPro-Demi.otf');
}

function setup() {
  createCanvas(1280, 720, WEBGL);
  txt = join(lines, '\n');
  y = height / 2;
}

function draw() {
  background(0);
  // No translate(): WEBGL mode starts with the origin in the center.

  fill(238, 213, 75);
  textFont(font);
  textSize(width * 0.04);
  textAlign(LEFT);
  rotateX(PI / 4);
  let w = width * 0.6;
  text(txt, -w / 2, y, w, height * 10);

  y -= 2;
}
