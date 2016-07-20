var x = 0;

function setup() {
  createCanvas(200, 200);
  //rainbow();
  setTimeout(rainbow, 1000);
}

// function mousePressed() {
//   setTimeout(rainbow, 3000);
// }

function rainbow() {
  createP('rainbow');
  setTimeout(rainbow, 1000);
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