// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for this video: https://youtu.be/LG8ZK-rRkXo

var a = 0;

var sponge = [];

function setup() {
  createCanvas(400, 400, WEBGL);
  // as of p5.js 0.6.0, normal material is no longer the default and
  // has to be explicitly selected.
  normalMaterial();

  // An array of Box objects
  // Star with one
  var b = new Box(0, 0, 0, 200);
  sponge.push(b);
}

function mousePressed() {
  // Generate the next set of boxes
  var next = [];
  for (var i = 0; i < sponge.length; i++) {
    var b = sponge[i];
    var newBoxes = b.generate();
    next = next.concat(newBoxes);
  }
  sponge = next;
}

function draw() {
  background(51);
  rotateX(a);
  rotateY(a * 0.4);
  rotateZ(a * 0.1);
  // Show what you've got!
  for (var i = 0; i < sponge.length; i++) {
    sponge[i].show();
  }
  a += 0.01;
}
