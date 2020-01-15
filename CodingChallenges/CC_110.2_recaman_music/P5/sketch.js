// Daniel Shiffman
// http://youtube.com/thecodingtrain
// http://codingtra.in

// Recaman Sequence Music
// https://youtu.be/pYnaBQgnARQ

let attackLevel = 1;
let releaseLevel = 0;

let attackTime = 0.01;
let decayTime = 0.1;
let susPercent = 0.5;
let releaseTime = 0.5;

let numbers = [];
let count = 1;
let sequence = [];
let index = 0;

let scl = 0;

let arcs = [];

let biggest = 0;

let osc;

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
  frameRate(5);

  env = new p5.Env();
  env.setADSR(attackTime, decayTime, susPercent, releaseTime);
  env.setRange(attackLevel, releaseLevel);

  osc = new p5.Oscillator();
  osc.setType('sine');
  osc.amp(env);
  osc.start();

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

  let n = (index % 25) + 24;
  let freq = pow(2, (n - 49) / 12) * 440;
  osc.freq(freq);
  env.play();

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

  if (count > windowWidth) {
    noLoop();
  }
  //console.log(index);
}
