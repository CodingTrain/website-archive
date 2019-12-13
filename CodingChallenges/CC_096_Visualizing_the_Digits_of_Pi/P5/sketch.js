// Daniel Shiffman
// http://codingtra.in

// Visualizing the Digits of Pi
// https://youtu.be/WEd_UIKG-uc
// https://thecodingtrain.com/CodingChallenges/096-visualizing-pi.html

let pi;
let digits;
let counts = new Array(10);
let index = 0;

function preload() {
  pi = loadStrings('pi-1million.txt');
}

function setup() {
  createCanvas(420, 420);

  //println(pi.length());
  const sdigits = pi[0].split('');

  //println(sdigits.length);
  digits = int(sdigits);

  //printArray(digits);
  background(0);
  stroke(255);
  noFill();
  translate(width / 2, height / 2);
  ellipse(0, 0, 400, 400);
}

function draw() {
  translate(width / 2, height / 2);

  const digit = digits[index];
  const nextDigit = digits[index + 1];
  index++;

  const diff = TWO_PI / 10;

  const a1 = map(digit, 0, 10, 0, TWO_PI) + random(-diff, diff);
  const a2 = map(nextDigit, 0, 10, 0, TWO_PI) + random(-diff, diff);

  const x1 = 200 * cos(a1);
  const y1 = 200 * sin(a1);

  const x2 = 200 * cos(a2);
  const y2 = 200 * sin(a2);

  stroke(255, 50);
  line(x1, y1, x2, y2);
}
