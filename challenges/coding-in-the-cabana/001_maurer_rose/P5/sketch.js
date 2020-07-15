// Maurer Rose
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/CodingInTheCabana/002-collatz-conjecture.html
// https://youtu.be/4uU9lZ-HSqA
// https://editor.p5js.org/codingtrain/sketches/qa7RiptE9

let n = 0;
let d = 0;
// let dSlider;

function setup() {
  createCanvas(400, 400);
  angleMode(DEGREES);
  //dSlider = createSlider(1,180,1);
}

function draw() {
  background(0);
  translate(width / 2, height / 2);
  stroke(255);
  //d = dSlider.value();
  noFill();
  beginShape();
  strokeWeight(1);
  for (let i = 0; i < 361; i++) {
    let k = i * d;
    let r = 150 * sin(n * k);
    let x = r * cos(k);
    let y = r * sin(k);
    vertex(x, y);
  }
  endShape();

  noFill();
  stroke(255, 0, 255, 255);
  strokeWeight(4);
  beginShape();
  for (let i = 0; i < 361; i++) {
    let k = i;
    let r = 150 * sin(n * k);
    let x = r * cos(k);
    let y = r * sin(k);
    vertex(x, y);
  }
  endShape();

  n += 0.001;
  d += 0.003;
}
