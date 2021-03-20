// The random() Function (Random House Exercise)
// Code! Programming with p5.js
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/beginners/p5js/beginners/p5js/2.4-random.html
// https://youtu.be/POn4cZ0jL-o

// Random Square Design: https://editor.p5js.org/codingtrain/sketches/Sl8ml_Lz8
// Random House Exercise: https://editor.p5js.org/codingtrain/sketches/HGq_S0Z5H
// Random Points: https://editor.p5js.org/codingtrain/sketches/h7hFqoV6H
// Painting Exercise 1: https://editor.p5js.org/codingtrain/sketches/stERy5a1D
// Painting Exercise 2: https://editor.p5js.org/codingtrain/sketches/IyyJ1QYKh

function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(5);
  randomSeed(5);
}

function draw() {
  background(random(0, 50), random(0, 50), random(150, 255));
  rectMode(CORNER);
  fill(random(0, 50), random(150, 255), random(0, 50));
  rect(0, height / 2, width, height / 2);
  let x = width / 2;
  let y = height / 2;
  let w = random(150, 400);
  let r = random(0.2, 1);
  let h = w * r;
  let sw = random(2, 4);
  strokeWeight(sw);
  stroke(0);
  // House
  rectMode(CENTER);
  fill(random(100, 255), 0, random(100, 255));
  rect(x, y, w, w * r);
  // Roof
  let rh = random(h / 2 + 50, 200);
  fill(random(50, 255), random(0, 50), random(0, 50));
  triangle(x - w / 2, y - (w * r) / 2, x + w / 2, y - (w * r) / 2, x, y - rh);

  // Door
  let ww = random(10, h / 3);
  let wx = random(ww, w / 2 - ww);
  strokeWeight(2);
  stroke(0);
  fill(random(100, 255), random(100, 255), random(100, 255));
  rect(x - wx, y - (w * r) / 4, ww, ww);
  rect(x + wx, y - (w * r) / 4, ww, ww);
  line(x - wx, y - (w * r) / 4 - ww / 2, x - wx, y - (w * r) / 4 + ww / 2);
  line(x - wx - ww / 2, y - (w * r) / 4, x - wx + ww / 2, y - (w * r) / 4);
  line(x + wx, y - (w * r) / 4 - ww / 2, x + wx, y - (w * r) / 4 + ww / 2);
  line(x + wx - ww / 2, y - (w * r) / 4, x + wx + ww / 2, y - (w * r) / 4);

  noStroke();
  fill(random(100, 255), random(100, 255), random(100, 255));
  rect(x, y + h / 4, h / 4, h / 2 - sw * 2);
  fill(random(0, 50), random(0, 50), random(0, 50));
  circle(x - h / 24, y + h / 4, h / 12);

  // noLoop();
}

function mousePressed() {
  background(0);
}
