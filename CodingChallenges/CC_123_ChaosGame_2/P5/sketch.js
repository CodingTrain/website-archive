// The Chaos Game
// Daniel Shiffman
// Part 1: https://youtu.be/7gNzMtYo9n4
// https://thecodingtrain.com/CodingChallenges/123.1-chaos-game
// Part 2: https://youtu.be/A0NHGTggoOQ
// https://thecodingtrain.com/CodingChallenges/123.2-chaos-game

let points;
let current;
let percent = 0.5;
let previous;

function setup() {
  createCanvas(windowWidth, windowHeight);
  points = [];
  const n = 5;

  for (let i = 0; i < n; i++) {
    // let v = createVector(random(width), random(height));
    let angle = (i * TWO_PI) / n;
    let v = p5.Vector.fromAngle(angle);
    v.mult(width / 2);
    v.add(width / 2, height / 2);
    points.push(v);
  }

  reset();
}

function reset() {
  current = createVector(random(width), random(height));
  background(0);
  stroke(255);
  strokeWeight(8);
  for (let p of points) {
    point(p.x, p.y);
  }
}

function draw() {
  if (frameCount % 100 == 0) {
    //reset();
  }

  for (let i = 0; i < 1000; i++) {
    strokeWeight(1);
    stroke(255);
    let next = random(points);
    if (next !== previous) {
      current.x = lerp(current.x, next.x, percent);
      current.y = lerp(current.y, next.y, percent);
      point(current.x, current.y);
    }
    previous = next;
  }
}
