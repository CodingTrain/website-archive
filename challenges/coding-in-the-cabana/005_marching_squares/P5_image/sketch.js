// Marching Squares Image
// Coding in the Cabana
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/challenges/coding-in-the-cabana/005-marching-squares.html
// https://youtu.be/0ZONMNUKTfU
// p5 port: https://editor.p5js.org/codingtrain/sketches/qThqi4OfJ

let field = [];
let rez = 20;
let cols, rows;

let img;

function preload() {
  img = loadImage('image0.jpg');
}

function setup() {
  createCanvas(1920, 1080);
  cols = width / rez;
  rows = height / rez;
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
  image(img, 0, 0, width, height);

  loadPixels();
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x = i * rez;
      let y = j * rez;
      let c = color(
        pixels[(x + y * width) * 4],
        pixels[(x + y * width) * 4 + 1],
        pixels[(x + y * width) * 4 + 2]
      );
      let b = brightness(c);
      field[i][j] = b;
      fill(255 - b);
      noStroke();
      rect(x, y, rez, rez);
    }
  }

  for (let i = 0; i < cols - 1; i++) {
    for (let j = 0; j < rows - 1; j++) {
      let x = i * rez;
      let y = j * rez;
      let a = createVector(x + rez * 0.5, y);
      let b = createVector(x + rez, y + rez * 0.5);
      let c = createVector(x + rez * 0.5, y + rez);
      let d = createVector(x, y + rez * 0.5);

      let threshold = 90; // map(mouseX, 0, width, 0, 255);
      let c1 = field[i][j] < threshold ? 0 : 1;
      let c2 = field[i + 1][j] < threshold ? 0 : 1;
      let c3 = field[i + 1][j + 1] < threshold ? 0 : 1;
      let c4 = field[i][j + 1] < threshold ? 0 : 1;

      let state = getState(c1, c2, c3, c4);
      stroke(255);
      strokeWeight(4);
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

  noLoop();
}

function getState(a, b, c, d) {
  return a * 8 + b * 4 + c * 2 + d * 1;
}
