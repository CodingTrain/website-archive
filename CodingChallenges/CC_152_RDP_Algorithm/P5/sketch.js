// Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/152-rdp-algorithm.html
// https://youtu.be/nSYw9GrakjY
// https://editor.p5js.org/codingtrain/sketches/SQjSugKn6

const allPoints = [];
let epsilon = 0;

function setup() {
  createCanvas(600, 400);
  for (let x = 0; x < width; x++) {
    const xval = map(x, 0, width, 0, 5);
    const yval = exp(-xval) * cos(TWO_PI * xval);
    const y = map(yval, -1, 1, height, 0);
    allPoints.push(createVector(x, y));
  }
}

function rdp(startIndex, endIndex, allPoints, rdpPoints) {
  const nextIndex = findFurthest(allPoints, startIndex, endIndex);
  if (nextIndex > 0) {
    if (startIndex != nextIndex) {
      rdp(startIndex, nextIndex, allPoints, rdpPoints);
    }
    rdpPoints.push(allPoints[nextIndex]);
    if (endIndex != nextIndex) {
      rdp(nextIndex, endIndex, allPoints, rdpPoints);
    }
  }
}

function findFurthest(points, a, b) {
  let recordDistance = -1;
  const start = points[a];
  const end = points[b];
  let furthestIndex = -1;
  for (let i = a + 1; i < b; i++) {
    const currentPoint = points[i];
    const d = lineDist(currentPoint, start, end);
    if (d > recordDistance) {
      recordDistance = d;
      furthestIndex = i;
    }
  }
  if (recordDistance > epsilon) {
    return furthestIndex;
  } else {
    return -1;
  }
}

function lineDist(c, a, b) {
  const norm = scalarProjection(c, a, b);
  return p5.Vector.dist(c, norm);
}

function scalarProjection(p, a, b) {
  const ap = p5.Vector.sub(p, a);
  const ab = p5.Vector.sub(b, a);
  ab.normalize(); // Normalize the line
  ab.mult(ap.dot(ab));
  const normalPoint = p5.Vector.add(a, ab);
  return normalPoint;
}

function draw() {
  background(0);

  const rdpPoints = [];

  const total = allPoints.length;
  const start = allPoints[0];
  const end = allPoints[total - 1];
  rdpPoints.push(start);
  rdp(0, total - 1, allPoints, rdpPoints);
  rdpPoints.push(end);
  //console.log(allPoints.size(), rdpPoints.length);

  epsilon += 0.01;
  if (epsilon > 100) {
    epsilon = 0;
  }

  //translate(0, -10);
  stroke(255, 0, 255);
  strokeWeight(4);
  noFill();
  beginShape();
  for (let v of allPoints) {
    vertex(v.x, v.y);
  }
  endShape();

  //translate(0, 20);
  stroke(255);
  strokeWeight(2);
  beginShape();
  for (let v of rdpPoints) {
    vertex(v.x, v.y);
  }
  endShape();
  fill(255);
  noStroke();
  textSize(24);
  text('epsilon: ' + nf(epsilon, 2, 2), 20, 25);
  text('n: ' + rdpPoints.length, 20, 50);
}
