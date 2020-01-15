// Daniel Shiffman
// http://youtube.com/thecodingtrain
// http://codingtra.in
// JavaScript transcription: Chuck England

// Coding Challenge #113: 4D Hypercube
// https://youtu.be/XE3YDVdQSPo

// Matrix Multiplication
// https://youtu.be/tzsgS19RRc8

let angle = 0;

let points = [];

function setup() {
  let size = min(windowWidth, windowHeight);
  createCanvas(size, size, WEBGL);
  points[0] = new P4Vector(-1, -1, -1, 1);
  points[1] = new P4Vector(1, -1, -1, 1);
  points[2] = new P4Vector(1, 1, -1, 1);
  points[3] = new P4Vector(-1, 1, -1, 1);
  points[4] = new P4Vector(-1, -1, 1, 1);
  points[5] = new P4Vector(1, -1, 1, 1);
  points[6] = new P4Vector(1, 1, 1, 1);
  points[7] = new P4Vector(-1, 1, 1, 1);
  points[8] = new P4Vector(-1, -1, -1, -1);
  points[9] = new P4Vector(1, -1, -1, -1);
  points[10] = new P4Vector(1, 1, -1, -1);
  points[11] = new P4Vector(-1, 1, -1, -1);
  points[12] = new P4Vector(-1, -1, 1, -1);
  points[13] = new P4Vector(1, -1, 1, -1);
  points[14] = new P4Vector(1, 1, 1, -1);
  points[15] = new P4Vector(-1, 1, 1, -1);
}

function draw() {
  background(0);
  rotateX(-PI / 2);
  let projected3d = [];

  for (let i = 0; i < points.length; i++) {
    const v = points[i];

    const rotationXY = [
      [cos(angle), -sin(angle), 0, 0],
      [sin(angle), cos(angle), 0, 0],
      [0, 0, 1, 0],
      [0, 0, 0, 1]
    ];

    const rotationZW = [
      [1, 0, 0, 0],
      [0, 1, 0, 0],
      [0, 0, cos(angle), -sin(angle)],
      [0, 0, sin(angle), cos(angle)]
    ];

    let rotated = matmul(rotationXY, v);
    rotated = matmul(rotationZW, rotated);

    let distance = 2;
    let w = 1 / (distance - rotated.w);

    const projection = [
      [w, 0, 0, 0],
      [0, w, 0, 0],
      [0, 0, w, 0]
    ];

    let projected = matmul(projection, rotated);
    projected.mult(width / 8);
    projected3d[i] = projected;

    stroke(255, 200);
    strokeWeight(32);
    noFill();

    point(projected.x, projected.y, projected.z);
  }

  // Connecting
  for (let i = 0; i < 4; i++) {
    connect(0, i, (i + 1) % 4, projected3d);
    connect(0, i + 4, ((i + 1) % 4) + 4, projected3d);
    connect(0, i, i + 4, projected3d);
  }

  for (let i = 0; i < 4; i++) {
    connect(8, i, (i + 1) % 4, projected3d);
    connect(8, i + 4, ((i + 1) % 4) + 4, projected3d);
    connect(8, i, i + 4, projected3d);
  }

  for (let i = 0; i < 8; i++) {
    connect(0, i, i + 8, projected3d);
  }

  //angle = map(mouseX, 0, width, 0, TWO_PI);
  angle += 0.02;
}

function connect(offset, i, j, points) {
  strokeWeight(4);
  stroke(255);
  const a = points[i + offset];
  const b = points[j + offset];
  line(a.x, a.y, a.z, b.x, b.y, b.z);
}
