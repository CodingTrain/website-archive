// Heart Curve
// Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/134-heart-curve.html
// https://youtu.be/oUBAi9xQ2X4
// I <3 you

const heart = [];
let a = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0);
  translate(width / 2, height / 2);

  stroke(255);
  strokeWeight(2);
  fill(150, 0, 100);
  beginShape();
  for (let v of heart) {
    vertex(v.x, v.y);
  }
  endShape();

  const r = height / 40;
  const x = r * 16 * pow(sin(a), 3);
  const y = -r * (13 * cos(a) - 5 * cos(2 * a) - 2 * cos(3 * a) - cos(4 * a));
  heart.push(createVector(x, y));

  // So that it stops
  if (a > TWO_PI) {
    noLoop();
  }

  a += 0.1;
}
