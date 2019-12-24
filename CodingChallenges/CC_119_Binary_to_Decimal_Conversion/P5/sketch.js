// Binary to Decimal Conversion
// Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/119-binary-decimal-conversion.html
// https://youtu.be/meGcdIoTYgw
// https://editor.p5js.org/codingtrain/sketches/HJn1hOPjX

let byte = [];
let decimalP;

function mousePressed() {
  for (let i = 0; i < byte.length; i++) {
    byte[i].toggle(mouseX, mouseY);
  }
}

function setup() {
  createCanvas(400, 100);
  decimalP = createDiv('');

  let w = width / 8;
  for (let i = 0; i < 8; i++) {
    byte[i] = new Bit(w / 2 + i * w, 50, w - 4);
    byte[i].setState(1);
  }
}

function draw() {
  background(220);
  let num = '';
  for (let i = 0; i < byte.length; i++) {
    byte[i].show();
    num += byte[i].state ? '1' : '0';
  }

  decimalP.html(binaryToDecimal(num));
}

function binaryToDecimal(val) {
  let sum = 0;
  for (let i = 0; i < val.length; i++) {
    let bit = val.charAt(val.length - i - 1);
    sum += parseInt(bit) * pow(2, i);
  }
  return sum;
}
