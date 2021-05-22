// Estimating π (from Random Numbers)
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/161-pi-from-random.html
// https://youtu.be/

// from Random Numbers: https://editor.p5js.org/codingtrain/sketches/FiOG6uajS
// from Digits of π: https://editor.p5js.org/codingtrain/sketches/x0eikODKm

let data;
let coprimeCount = 0;
let total = 0;
let index = 0;
let randomSequence = [];

function preload() {
  data = loadStrings('milliondigits.txt');
}

function setup() {
  createCanvas(400, 400);
  let digits = data[0];
  while (digits.length > 0) {
    let num = digits.slice(0, 5);
    digits = digits.slice(5);
    // Original code was randomSequence.push(parseInt(num));
    // JavaScript will default to reading number as base 8 if it begins with a 0
    randomSequence.push(parseInt(num, 10));
  }
}

function draw() {
  for (let n = 0; n < 500; n++) {
    let a = randomSequence[index] + 1;
    let b = randomSequence[index + 1] + 1;
    // console.log(a,b);
    if (gcd(a, b) == 1) {
      coprimeCount++;
    }
    total++;
    index += 2;
    if (index == randomSequence.length) {
      noLoop();
      console.log('complete');
      break;
    }
  }

  let pie = sqrt((6 * total) / coprimeCount);

  background(0);
  textAlign(CENTER, CENTER);
  textSize(64);
  fill(255);
  textFont('Courier');
  text(nf(pie, 1, 5), width / 2, height / 2);

  let w = (width * index) / randomSequence.length;
  stroke(255);
  noFill();
  rect(0, 10, width, 20);
  fill(255);
  rect(0, 10, w, 20);
}

function gcd(a, b) {
  if (b > a) {
    [b, a] = [a, b];
  }

  let r = a % b;
  if (r == 0) {
    return b;
  } else {
    return gcd(b, r);
  }
}
