// Self Avoiding Walk (Random Walk with Alpha)
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/162-self-avoiding-walk.html
// https://youtu.be/

// Basic: https://editor.p5js.org/codingtrain/sketches/2_4gyDD_9
// With Backtracking: https://editor.p5js.org/codingtrain/sketches/dRWS3A9nq
// 3D: https://editor.p5js.org/codingtrain/sketches/D0ONOlCDT
// With Bezier: https://editor.p5js.org/codingtrain/sketches/KFbX0NWgh
// With Recursion: https://editor.p5js.org/codingtrain/sketches/UPxBk1YiB
// Random Walk with Alpha: https://editor.p5js.org/codingtrain/sketches/IEw2RkDnJ

let x;
let y;

let grid;
let spacing = 5;
let cols, rows;

function make2DArray(cols, rows) {
  let arr = new Array(cols);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
  }
  return arr;
}

function setup() {
  createCanvas(400, 400);
  cols = floor(width / spacing);
  rows = floor(height / spacing);
  x = cols / 2;
  y = rows / 2;
  background(51);
  grid = make2DArray(cols, rows);
}

function draw() {
  stroke(255, 100);
  strokeWeight(spacing * 0.5);
  point(x * spacing, y * spacing);
  const r = floor(random(4));
  switch (r) {
    case 0:
      x = x + 1;
      break;
    case 1:
      x = x - 1;
      break;
    case 2:
      y = y + 1;
      break;
    case 3:
      y = y - 1;
      break;
  }
}
