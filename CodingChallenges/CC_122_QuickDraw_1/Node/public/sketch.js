// The Coding Train
// Coding Challenge 122.1
// Quick Draw
// https://youtu.be/yLuk0twx8Hc
// https://thecodingtrain.com/CodingChallenges/122.1-quick-draw
// Part 2: https://youtu.be/EcRK6oFddPQ
// https://thecodingtrain.com/CodingChallenges/122.2-quick-draw

let strokeIndex = 0;
let index = 0;
let cat;
let prevx, prevy;

function setup() {
  createCanvas(255, 255);
  newCat();
}

function newCat() {
  loadJSON('/cat', gotCat);
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
        console.log(strokeIndex);
        cat = undefined;
        strokeIndex = 0;
        //setTimeout(newCat, 250);
      }
    } else {
      prevx = x;
      prevy = y;
    }
  }
}

function gotCat(data) {
  background(250);
  cat = data.drawing;
  console.log(cat);
}
