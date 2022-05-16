// Marching Squares Metaballs Interpolation
// Coding in the Cabana
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/challenges/coding-in-the-cabana/005-marching-squares.html
// https://youtu.be/0ZONMNUKTfU
// p5 port: https://editor.p5js.org/codingtrain/sketches/hEB4588QC

let bubbles = [];
let field = [];
let rez = 16;
let cols, rows;

function setup() {
  createCanvas(400, 300);
  cols = 1 + width / rez;
  rows = 1 + height / rez;
  for (let i = 0; i < cols; i++) {
    let k = [];
    for (let j = 0; j < rows; j++) {
      k.push(0);
    }
    field.push(k);
  }
  for (let i = 0; i < 3; i++) {
    bubbles.push(new Bubble());
  }
}

function drawLine(v1, v2) {
  line(v1.x, v1.y, v2.x, v2.y);
}

function draw() {
  background(0);

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let sum = 0;
      let x = i * rez;
      let y = j * rez;
      for (let b of bubbles) {
        sum += (b.r * b.r) / ((x - b.x) * (x - b.x) + (y - b.y) * (y - b.y));
      }
      field[i][j] = sum;
    }
  }
  //for (int i = 0; i < cols; i++) {
  //  for (int j = 0; j < rows; j++) {
  //    fill(field[i][j]*255);
  //    noStroke();
  //    rect(i*rez, j*rez, rez, rez);
  //  }
  //}

  for (let b of bubbles) {
    b.update();
    b.show();
  }

  for (let i = 0; i < cols - 1; i++) {
    for (let j = 0; j < rows - 1; j++) {
      let x = i * rez;
      let y = j * rez;

      // interpolation
      let threshold = 1;
      let c1 = field[i][j] < threshold ? 0 : 1;
      let c2 = field[i + 1][j] < threshold ? 0 : 1;
      let c3 = field[i + 1][j + 1] < threshold ? 0 : 1;
      let c4 = field[i][j + 1] < threshold ? 0 : 1;
      let state = getState(c1, c2, c3, c4);
      stroke(255);
      strokeWeight(2);
      let a_val = field[i][j];
      let b_val = field[i + 1][j];
      let c_val = field[i + 1][j + 1];
      let d_val = field[i][j + 1];

      let a = createVector();
      let amt = (1 - a_val) / (b_val - a_val);
      a.x = lerp(x, x + rez, amt);
      a.y = y;

      let b = createVector();
      amt = (1 - b_val) / (c_val - b_val);
      b.x = x + rez;
      b.y = lerp(y, y + rez, amt);

      let c = createVector();
      amt = (1 - d_val) / (c_val - d_val);
      c.x = lerp(x, x + rez, amt);
      c.y = y + rez;
      for (let i = 0; i < cols; i++) {
        let k = [];
        for (let j = 0; j < rows; j++) {
          k.push(0);
        }
        field.push(k);
      }

      let d = createVector();
      amt = (1 - a_val) / (d_val - a_val);
      d.x = x;
      d.y = lerp(y, y + rez, amt);

      stroke(255);
      strokeWeight(2);
      switch (state) {
        case 1:
          drawLine(c, d);
          break;
        case 2:
          drawLine(b, c);
          break;
        case 3:
          drawLine(b, d);
          break;
        case 4:
          drawLine(a, b);
          break;
        case 5:
          drawLine(a, d);
          drawLine(b, c);
          break;
        case 6:
          drawLine(a, c);
          break;
        case 7:
          drawLine(a, d);
          break;
        case 8:
          drawLine(a, d);
          break;
        case 9:
          drawLine(a, c);
          break;
        case 10:
          drawLine(a, b);
          drawLine(c, d);
          break;
        case 11:
          drawLine(a, b);
          break;
        case 12:
          drawLine(b, d);
          break;
        case 13:
          drawLine(b, c);
          break;
        case 14:
          drawLine(c, d);
          break;
      }
    }
  }
}

function getState(a, b, c, d) {
  return a * 8 + b * 4 + c * 2 + d * 1;
}
