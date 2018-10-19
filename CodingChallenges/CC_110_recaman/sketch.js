// Daniel Shiffman
// http://youtube.com/thecodingtrain
// http://codingtra.in

// Recaman Sequence
// https://youtu.be/DhFZfzOvNTU

let numbers = [];
let count = 1;
let sequence = [];
let index = 0;

let scl = 0;

let arcs = [];

let biggest = 0;

class Arc {
  constructor(start, end, dir) {
    this.start = start;
    this.end = end;
    this.dir = dir;
  }

  show() {
    let diameter = abs(this.end - this.start);
    let x = (this.end + this.start) / 2;
    stroke(255);
    strokeWeight(0.5);
    noFill();
    if (this.dir == 0) {
      arc(x, 0, diameter, diameter, PI, 0);
    } else {
      arc(x, 0, diameter, diameter, 0, PI);
    }
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(30);
  background(0);
  numbers[index] = true;
  sequence.push(index);
}

function step() {
  let next = index - count;
  if (next < 0 || numbers[next]) {
    next = index + count;
  }
  numbers[next] = true;
  sequence.push(next);

  let a = new Arc(index, next, count % 2);
  arcs.push(a);
  index = next;

  if (index > biggest) {
    biggest = index;
  }

  count++;
}

function draw() {
  step();
  translate(0, height / 2);
  scl = lerp(scl, width / biggest, 0.1);
  scale(scl);
  background(0);

  for (let a of arcs) {
    a.show();
  }

  // if (count > windowWidth) {
  //   noLoop();
  // }
}
