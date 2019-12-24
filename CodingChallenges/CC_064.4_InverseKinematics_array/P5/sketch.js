// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Video: https://youtu.be/10st01Z0jxc
// Tanscription to Javascript: Chuck England

let tentacles = [];

let pos;
let vel;
let gravity;

function setup() {
  createCanvas(800, 600);
  pos = createVector(0, 0);
  vel = createVector(2, 1.3);
  gravity = createVector(0, 0.1);
  vel.mult(3);

  let da = TWO_PI / 2;
  for (let a = 0; a < TWO_PI; a += da) {
    let x = width / 2 + cos(a) * 300;
    let y = height / 2 + sin(a) * 300;
    tentacles.push(new Tentacle(x, y));
  }
}

function draw() {
  background(51);
  noFill();
  ellipse(width / 2, height / 2, 400, 400);
  for (let i = 0; i < tentacles.length; i++) {
    let t = tentacles[i];
    t.update();
    t.show();
  }

  pos.add(vel);
  vel.add(gravity);
  noStroke();
  fill(100, 255, 0);
  ellipse(pos.x, pos.y, 32, 32);

  if (pos.x > width || pos.x < 0) {
    vel.x *= -1;
  }

  if (pos.y > height) {
    pos.y = height;
    vel.y *= -1;
    vel.mult(0.95);
  }
}
