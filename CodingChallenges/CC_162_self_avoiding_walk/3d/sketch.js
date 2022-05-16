// Self Avoiding Walk (3D)
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/162-self-avoiding-walk.html
// https://youtu.be/

// Basic: https://editor.p5js.org/codingtrain/sketches/2_4gyDD_9
// With Backtracking: https://editor.p5js.org/codingtrain/sketches/dRWS3A9nq
// 3D: https://editor.p5js.org/codingtrain/sketches/D0ONOlCDT
// With Bezier: https://editor.p5js.org/codingtrain/sketches/KFbX0NWgh
// With Recursion: https://editor.p5js.org/codingtrain/sketches/UPxBk1YiB
// Random Walk with Alpha: https://editor.p5js.org/codingtrain/sketches/IEw2RkDnJ

let grid;
let spacing = 20;
let cols, rows;
let path = [];
let spot;

function make3DArray(cols, rows, depth) {
  let arr = new Array(cols);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
    for (let j = 0; j < arr[i].length; j++) {
      arr[i][j] = new Array(depth);
    }
  }
  return arr;
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  cols = floor(width / spacing);
  rows = floor(height / spacing);
  depth = cols;
  background(51);
  grid = make3DArray(cols, rows, depth);
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      for (let k = 0; k < depth; k++) {
        grid[i][j][k] = new Spot(i, j, k);
      }
    }
  }
  const cx = floor(cols / 2);
  spot = grid[cx][cx][cx];
  path.push(spot);
  spot.visited = true;
  // frameRate(1);
}

function isValid(i, j, k) {
  if (i < 0 || i >= cols || j < 0 || j >= rows || k < 0 || k >= depth) {
    return false;
  }
  return !grid[i][j][k].visited;
}

let lerpX = 0;
let lerpY = 0;
let lerpZ = 0;

function draw() {
  background(0);

  let center = createVector(0, 0, 0);
  let minXYZ = createVector(Infinity, Infinity, Infinity);
  let maxXYZ = createVector(0, 0, 0);
  for (let v of path) {
    minXYZ.x = min(v.x, minXYZ.x);
    minXYZ.y = min(v.y, minXYZ.y);
    minXYZ.z = min(v.z, minXYZ.z);
    maxXYZ.x = max(v.x, maxXYZ.x);
    maxXYZ.y = max(v.y, maxXYZ.y);
    maxXYZ.z = max(v.z, maxXYZ.z);
  }

  center.x = (maxXYZ.x - minXYZ.x) * 0.5 + minXYZ.x;
  center.y = (maxXYZ.y - minXYZ.y) * 0.5 + minXYZ.y;
  center.z = (maxXYZ.z - minXYZ.z) * 0.5 + minXYZ.z;

  const amt = 0.05;
  lerpX = lerp(lerpX, center.x, amt);
  lerpY = lerp(lerpY, center.y, amt);
  lerpZ = lerp(lerpZ, center.z, amt);
  //orbitControl();
  // translate(-spacing * cols * 0.5, -spacing * rows * 0.5, -spacing * depth * 0.5);
  rotateY(frameCount * 0.002);
  translate(-lerpX, -lerpY, -lerpZ);
  // for (let i = 0; i < 500000; i++) {
  spot = spot.nextSpot();
  if (!spot) {
    let stuck = path.pop();
    stuck.clear();
    spot = path[path.length - 1];
  } else {
    path.push(spot);
    spot.visited = true;
  }

  if (path.length === cols * rows * depth) {
    console.log('Solved!');
    noLoop();
    // break;
  }
  //}

  stroke(255);
  strokeWeight(spacing * 0.1);
  noFill();

  colorMode(HSB);
  for (let i = 0; i < path.length - 1; i++) {
    let v1 = path[i];
    // path[i].x += random(-0.1,0.1);
    // path[i].y += random(-0.1,0.1);
    // path[i].z += random(-0.1,0.1);
    let v2 = path[i + 1];
    // let r = map(v1.i,0,cols,100, 255);
    // let g = map(v1.j,0,rows,100, 255);
    // let b = map(v1.k,0,depth,100, 255);
    // stroke(r,g,b);
    stroke((i + frameCount) % 360, 100, 100);

    line(v1.x, v1.y, v1.z, v2.x, v2.y, v2.z);
  }

  // beginShape();
  // for (let spot of path) {
  //   vertex(spot.x, spot.y, spot.z);
  // }
  // endShape();

  stroke(255);
  strokeWeight(spacing * 0.5);
  point(spot.x, spot.y, spot.z);
}
