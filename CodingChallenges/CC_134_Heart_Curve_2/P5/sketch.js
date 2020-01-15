// Heart Curve
// Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/134.2-heart-curve-gif-loop.html
// https://youtu.be/l5I3Q1JFISE
// https://editor.p5js.org/codingtrain/sketches/C0kJ-BjYW
// I <3 you

const heart = [];
const totalFrames = 240;
let counter = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  const percent = float(counter % totalFrames) / totalFrames;
  render(percent);
  counter++;
}

function render(percent) {
  background(0);
  translate(width / 2, height / 2);
  stroke(255, 0, 200);
  strokeWeight(4);
  fill(150, 0, 100);
  beginShape();
  for (let v of heart) {
    const a = map(percent, 0, 1, 0, TWO_PI * 2);
    const r = map(sin(a), -1, 1, height / 80, height / 40);
    vertex(r * v.x, r * v.y);
  }
  endShape();

  if (percent < 0.5) {
    const a = map(percent, 0, 0.5, 0, TWO_PI);
    const x = 16 * pow(sin(a), 3);
    const y = -(13 * cos(a) - 5 * cos(2 * a) - 2 * cos(3 * a) - cos(4 * a));
    heart.push(createVector(x, y));
  } else {
    heart.splice(0, 1);
  }
}
