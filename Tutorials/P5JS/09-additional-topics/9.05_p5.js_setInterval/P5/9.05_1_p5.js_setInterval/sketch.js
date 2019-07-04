var x = 0;

var timer;
var counter = 0;
var interval;
var button;

function setup() {
  createCanvas(200, 200);
  timer = createP('timer');
  button = createButton('start timer');
  button.mousePressed(doTimer);
}

function doTimer() {
  if (!interval) {
    interval = setInterval(timeIt, 500);
    button.html('stop timer');
  } else {
    clearInterval(interval);
    interval = false;
    button.html('start timer');
  }
}

function timeIt() {
  timer.html(counter);
  counter++;
}

function draw() {
  background(51);
  stroke(255);
  line(x, 0, x, height);

  x = x + 3;
  if (x > width) {
    x = 0;
  }
}