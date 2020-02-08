// Hilbert Curve
// Coding in the Cabana
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/CodingInTheCabana/003-hilbert-curve.html
// https://youtu.be/dSK-MW-zuAc
// https://editor.p5js.org/codingtrain/sketches/LPf9PLmp

const order = 8;
let N;
let total;

let path = [];

let counter = 0;

function setup() {
  createCanvas(512, 512);
  colorMode(HSB, 360, 255, 255);
  background(0);

  N = int(pow(2, order));
  total = N * N;

  for (let i = 0; i < total; i++) {
    path[i] = hilbert(i);
    let len = width / N;
    path[i].mult(len);
    path[i].add(len / 2, len / 2);
  }
}

function draw() {
  background(0);

  stroke(255);
  strokeWeight(1);
  noFill();
  //beginShape();
  for (let i = 1; i < counter; i++) {
    let h = map(i, 0, path.length, 0, 360);
    stroke(h, 255, 255);
    line(path[i].x, path[i].y, path[i - 1].x, path[i - 1].y);
  }
  //endShape();

  counter += 50;
  if (counter >= path.length) {
    counter = 0;
  }

  // strokeWeight(4);
  // for (let i = 0; i < path.length; i++) {
  //  point(path[i].x, path[i].y);
  //  text(i, path[i].x+5, path[i].y);
  // }
}

function hilbert(i) {
  const points = [
    new p5.Vector(0, 0),
    new p5.Vector(0, 1),
    new p5.Vector(1, 1),
    new p5.Vector(1, 0)
  ];

  let index = i & 3;
  let v = points[index];

  for (let j = 1; j < order; j++) {
    i = i >>> 2;
    index = i & 3;
    let len = pow(2, j);
    if (index == 0) {
      let temp = v.x;
      v.x = v.y;
      v.y = temp;
    } else if (index == 1) {
      v.y += len;
    } else if (index == 2) {
      v.x += len;
      v.y += len;
    } else if (index == 3) {
      let temp = len - 1 - v.x;
      v.x = len - 1 - v.y;
      v.y = temp;
      v.x += len;
    }
  }
  return v;
}
