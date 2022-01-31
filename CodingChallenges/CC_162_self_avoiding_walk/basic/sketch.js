// Self Avoiding Walk (Basic)
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/162-self-avoiding-walk.html
// https://youtu.be/

// Basic: https://editor.p5js.org/codingtrain/sketches/2_4gyDD_9
// With Backtracking: https://editor.p5js.org/codingtrain/sketches/dRWS3A9nq
// 3D: https://editor.p5js.org/codingtrain/sketches/D0ONOlCDT
// With Bezier: https://editor.p5js.org/codingtrain/sketches/KFbX0NWgh
// With Recursion: https://editor.p5js.org/codingtrain/sketches/UPxBk1YiB
// Random Walk with Alpha: https://editor.p5js.org/codingtrain/sketches/IEw2RkDnJ

let allOptions = [
  { dx: 1, dy: 0 },
  { dx: -1, dy: 0 },
  { dx: 0, dy: 1 },
  { dx: 0, dy: -1 }
];

let x;
let y;

let grid;
let spacing = 10;
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
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j] = false;
    }
  }
  grid[x][y] = true;
}

function isValid(i, j) {
  if (i < 0 || i >= cols || j < 0 || j >= rows) {
    return false;
  }
  return !grid[i][j];
}

function draw() {
  stroke(255);
  strokeWeight(spacing * 0.5);
  point(x * spacing, y * spacing);

  let options = [];
  for (let option of allOptions) {
    let newX = x + option.dx;
    let newY = y + option.dy;
    if (isValid(newX, newY)) {
      options.push(option);
    }
  }

  if (options.length > 0) {
    let step = random(options);

    strokeWeight(1);
    stroke(255);
    beginShape();
    vertex(x * spacing, y * spacing);
    x += step.dx;
    y += step.dy;
    vertex(x * spacing, y * spacing);
    endShape();
    grid[x][y] = true;
  } else {
    console.log('Stuck!');
    noLoop();
  }
}
