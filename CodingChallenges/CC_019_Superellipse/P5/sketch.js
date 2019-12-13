// Superellipse
// Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/019-superellipse.html
// https://youtu.be/z86cx2A4_3E
// https://editor.p5js.org/codingtrain/sketches/Hk-1AMTgN

let slider;

function setup() {
  createCanvas(400, 400);
  slider = createSlider(0, 10, 2, 0.01);
}

function draw() {
  background(51);
  translate(width / 2, height / 2);

  let a = 100;
  let b = 100;
  let n = slider.value();
  stroke(255);
  noFill();

  beginShape();
  for (let angle = 0; angle < TWO_PI; angle += 0.1) {
    // Simple ellipse
    // let x = r * cos(angle);
    // let y = r * sin(angle);

    // Superellipse
    let na = 2 / n;
    let x = pow(abs(cos(angle)), na) * a * sgn(cos(angle));
    let y = pow(abs(sin(angle)), na) * b * sgn(sin(angle));
    vertex(x, y);
  }
  endShape(CLOSE);
}

function sgn(val) {
  if (val == 0) {
    return 0;
  }
  return val / abs(val);
}
