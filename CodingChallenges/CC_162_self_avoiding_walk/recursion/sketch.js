// Self Avoiding Walk (With Recursion)
// The Coding Train / Dusk Virkus
// https://thecodingtrain.com/CodingChallenges/162-self-avoiding-walk.html
// https://youtu.be/

// Basic: https://editor.p5js.org/codingtrain/sketches/2_4gyDD_9
// With Backtracking: https://editor.p5js.org/codingtrain/sketches/dRWS3A9nq
// 3D: https://editor.p5js.org/codingtrain/sketches/D0ONOlCDT
// With Bezier: https://editor.p5js.org/codingtrain/sketches/KFbX0NWgh
// With Recursion: https://editor.p5js.org/codingtrain/sketches/UPxBk1YiB
// Random Walk with Alpha: https://editor.p5js.org/codingtrain/sketches/IEw2RkDnJ

let spacing = 80;
let cols, rows;

function selfAvoidingWalk(desiredLength, rows, cols, start) {
  // create visited array and fill with false
  let visited = [];
  for (let i = 0; i < cols; i++) {
    let arr = [];
    for (let j = 0; j < rows; j++) {
      arr.push(false);
    }
    visited.push(arr);
  }

  let path = [];
  if (selfAvoidingWalkHelper(path, visited, desiredLength, start.x, start.y)) {
    console.log('found self avoiding walk!');
    return path;
  } else {
    console.log('no self avoiding walk found.');
    return undefined;
  }
}

function selfAvoidingWalkHelper(path, visited, desiredLength, i, j) {
  // base cases
  if (path.length >= desiredLength) {
    return true;
  }
  if (i < 0 || i >= cols || j < 0 || j >= rows || visited[i][j]) {
    return false;
  }

  // Add to path
  visited[i][j] = true;
  path.push(createVector(i, j));

  // Recursivly try directions
  if (selfAvoidingWalkHelper(path, visited, desiredLength, i + 1, j)) {
    return true;
  }
  if (selfAvoidingWalkHelper(path, visited, desiredLength, i - 1, j)) {
    return true;
  }
  if (selfAvoidingWalkHelper(path, visited, desiredLength, i, j + 1)) {
    return true;
  }
  if (selfAvoidingWalkHelper(path, visited, desiredLength, i, j - 1)) {
    return true;
  }

  // If we reach this point there's no path that worked so we have to remove the spot from the path
  visited[i][j] = false;
  path.pop();

  return false;
}

function setup() {
  createCanvas(400, 400);
  cols = floor(width / spacing);
  rows = floor(height / spacing);

  let path = selfAvoidingWalk(
    rows * cols,
    rows,
    cols,
    createVector(floor(cols / 2), floor(rows / 2))
  );

  // draw path
  background(0);
  translate(spacing * 0.5, spacing * 0.5);

  noFill();
  stroke(255);
  strokeWeight(3);
  beginShape();
  for (const loc of path) {
    vertex(loc.x * spacing, loc.y * spacing);
  }
  endShape();

  noLoop();
}
