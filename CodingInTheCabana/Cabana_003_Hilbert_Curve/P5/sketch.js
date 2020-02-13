// Hilbert Curve
// Coding in the Cabana
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/CodingInTheCabana/003-hilbert-curve.html
// https://youtu.be/dSK-MW-zuAc
// https://editor.p5js.org/codingtrain/sketches/LPf9PLmp

const order = 8;
const path = [];
const jump = 50;
let counter = 1;

function setup() {
  createCanvas(512, 512);
  colorMode(HSB, 360, 255, 255);
  background(0);
  stroke(255);
  strokeWeight(1);
  noFill();

  const N = int(pow(2, order));
  const total = N * N;
  const len = width / N;

  for (let i = 0; i < total; i++) {
    path[i] = hilbert(i);
    path[i].mult(len);
    path[i].add(len / 2, len / 2);
  }
}

function draw() {
  for (let i = counter; i < counter + jump && i < path.length; i++) {
    const h = map(i, 0, path.length, 0, 360);
    stroke(h, 255, 255);
    line(path[i].x, path[i].y, path[i - 1].x, path[i - 1].y);
  }

  counter += 50;
  if (counter >= path.length) {
    counter = 1;
    background(0);
  }
}

function hilbert(i) {
  const points = [
    new p5.Vector(0, 0),
    new p5.Vector(0, 1),
    new p5.Vector(1, 1),
    new p5.Vector(1, 0)
  ];

  let index = i & 3;
  const v = points[index];

  for (let j = 1; j < order; j++) {
    i = i >>> 2;
    index = i & 3;
    const len = pow(2, j);
    if (index == 0) {
      const temp = v.x;
      v.x = v.y;
      v.y = temp;
    } else if (index == 1) {
      v.y += len;
    } else if (index == 2) {
      v.x += len;
      v.y += len;
    } else if (index == 3) {
      const temp = len - 1 - v.x;
      v.x = len - 1 - v.y;
      v.y = temp;
      v.x += len;
    }
  }
  return v;
}
