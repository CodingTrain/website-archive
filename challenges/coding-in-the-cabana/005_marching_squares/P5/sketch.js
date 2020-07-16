// Marching Squares
// Coding in the Cabana
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/challenges/coding-in-the-cabana/005-marching-squares.html
// https://youtu.be/0ZONMNUKTfU
// p5 port: https://editor.p5js.org/codingtrain/sketches/g6-zufS8c

let field = [];
let rez = 5;
let cols, rows;
let increment = 0.1;
let zoff = 0;
let noise;

function setup() {
  createCanvas(300, 300);
  noise = new OpenSimplexNoise(Date.now());
  cols = 1 + width / rez;
  rows = 1 + height / rez;
  for (let i = 0; i < cols; i++) {
    let k = [];
    for (let j = 0; j < rows; j++) {
      k.push(0);
    }
    field.push(k);
  }
}

function drawLine(v1, v2) {
  line(v1.x, v1.y, v2.x, v2.y);
}

function draw() {
  background(0);
  let xoff = 0;
  for (let i = 0; i < cols; i++) {
    xoff += increment;
    let yoff = 0;
    for (let j = 0; j < rows; j++) {
      field[i][j] = float(noise.noise3D(xoff, yoff, zoff));
      yoff += increment;
    }
  }
  zoff += 0.03;

  //for (let i = 0; i < cols; i++) {
  //  for (let j = 0; j < rows; j++) {
  //    fill(field[i][j]*255);
  //    noStroke();
  //    rect(i*rez, j*rez, rez, rez);
  //  }
  //}

  for (let i = 0; i < cols - 1; i++) {
    for (let j = 0; j < rows - 1; j++) {
      let x = i * rez;
      let y = j * rez;
      let a = createVector(x + rez * 0.5, y);
      let b = createVector(x + rez, y + rez * 0.5);
      let c = createVector(x + rez * 0.5, y + rez);
      let d = createVector(x, y + rez * 0.5);
      let state = getState(
        ceil(field[i][j]),
        ceil(field[i + 1][j]),
        ceil(field[i + 1][j + 1]),
        ceil(field[i][j + 1])
      );
      stroke(255);
      strokeWeight(1);
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
