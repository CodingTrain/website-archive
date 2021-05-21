// The Coding Train
// Coding Challenge 122.1
// Quick Draw
// Part 2: https://youtu.be/EcRK6oFddPQ
// https://thecodingtrain.com/CodingChallenges/122.2-quick-draw
// Part 1: https://youtu.be/yLuk0twx8Hc
// https://thecodingtrain.com/CodingChallenges/122.1-quick-draw

const url =
  'https://quickdrawfiles.appspot.com/drawing/cat?isAnimated=false&format=json&key=';

let strokeIndex = 0;
let index = 0;
let cat;
let prevx, prevy;
let keyInput;
let start;

function setup() {
  createCanvas(255, 255);
  newCat();
  // keyInput = createInput('');
  // keyInput.attribute('type', 'password');
  // start = createButton('start');
  // start.mousePressed(newCat);
}

function newCat() {
  let apiKey = ''; // keyInput.value();
  loadJSON(url + apiKey, gotCat);
}

function gotCat(data) {
  background(220);
  cat = data.drawing;
}

function draw() {
  if (cat) {
    let x = cat[strokeIndex][0][index];
    let y = cat[strokeIndex][1][index];
    stroke(0);
    strokeWeight(3);
    if (prevx !== undefined) {
      line(prevx, prevy, x, y);
    }
    index++;
    if (index === cat[strokeIndex][0].length) {
      strokeIndex++;
      prevx = undefined;
      prevy = undefined;
      index = 0;
      if (strokeIndex === cat.length) {
        cat = undefined;
        strokeIndex = 0;
        setTimeout(newCat, 100);
      }
    } else {
      prevx = x;
      prevy = y;
    }
  }
}
