// Pi Day Digit Search
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/156-pi-digits.html
// https://youtu.be/
// https://editor.p5js.org/codingtrain/sketches/U649qYR4

let digits, searchBox;
let indexP;

function searchItUp() {
  let search = searchBox.value();
  console.log(search);

  const url = `http://localhost:3000/search/${search}`;
  loadJSON(url, gotResults);
}

function gotResults(data) {
  console.log(data);
  indexP.html(data.index);
}

function setup() {
  noCanvas();
  searchBox = createInput('');
  searchBox.input(searchItUp);
  indexP = createP('searching');
}
