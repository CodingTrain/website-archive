// Unit Vector (Normalize)
// The Nature of Code
// The Coding Train / Daniel Shiffman
// https://youtu.be/ttz05d8DSOs
// https://thecodingtrain.com/learning/nature-of-code/1.2-vector-math.html
// https://editor.p5js.org/codingtrain/sketches/U4ezFLIZ

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(0);

  let pos = createVector(200, 200);
  let mouse = createVector(mouseX, mouseY);

  let v = p5.Vector.sub(mouse, pos);

  // let m = v.mag();
  // v.div(m);

  // v.normalize();
  // v.mult(50);

  v.normalize().mult(50);

  // v.setMag(50);

  translate(width / 2, height / 2);
  strokeWeight(4);
  stroke(255);
  line(0, 0, v.x, v.y);
}
