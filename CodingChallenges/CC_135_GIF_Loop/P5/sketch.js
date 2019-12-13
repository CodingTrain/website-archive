// GIF Loop
// Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/135-gif-loop.html
// https://youtu.be/nBKwCCtWlUg

const totalFrames = 120;
let counter = 0;
const record = false;

function setup() {
  createCanvas(400, 400);
}

function draw() {
  let percent = 0;
  if (record) {
    percent = float(counter) / totalFrames;
  } else {
    percent = float(counter % totalFrames) / totalFrames;
  }
  render(percent);
  if (record) {
    save('output/gif-' + nf(counter, 3) + '.png');
    if (counter == totalFrames - 1) {
      noLoop();
    }
  }
  counter++;
}

function render(percent) {
  let angle = map(percent, 0, 1, 0, TWO_PI);
  background(0);
  translate(width / 2, height / 2);
  rotate(angle);
  stroke(255);
  noFill();
  rectMode(CENTER);
  square(0, 0, 100);
}
