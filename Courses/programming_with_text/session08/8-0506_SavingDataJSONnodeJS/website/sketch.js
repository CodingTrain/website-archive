// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/4zr8j-jeU_M

function setup() {
  createCanvas(300, 200);
  drawData();
  console.log('running');

  var button = select('#submit');
  button.mousePressed(submitWord);
}

function drawData() {
  loadJSON('all', gotData);
}

function submitWord() {
  var word = select('#word').value();
  var score = select('#score').value();
  console.log(word, score);

  loadJSON('add/' + word + '/' + score, finished);

  function finished(data) {
    console.log(data);
    drawData();
  }

}


function gotData(data) {
  background(51);
  console.log(data);
  var keys = Object.keys(data);
  for (var i = 0; i < keys.length; i++) {
    var word = keys[i];
    var score = data[word];
    var x = random(width);
    var y = random(height);
    fill(255);
    textSize(16);
    text(word, x, y);
  }
}