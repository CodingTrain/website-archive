// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/AKuW48WeNMA

var textfield;
var output;
var submit;

function setup() {
  console.log(this);
  noCanvas();
  textfield = select('#input');
  output = select('#output');
  submit = select('#submit');
  submit.mousePressed(newText);
}

function highlight() {
  console.log(this.html());
  this.html('rainbow');
  var c = color(random(255), random(255), random(255));
  this.style('background-color', c);
  //var s = this.html().replace(

  //console.log(this);
  //console.log('hover');
}

function newText() {
  var s = textfield.value();

  var words = s.split(/(\W+)/);
  console.log(words);
  for (var i = 0; i < words.length; i++) {
    var span = createSpan(words[i]);
    span.parent(output);

    if (!/\W+/.test(words[i])) {
      //span.style('background-color', color(random(255), 0, random(255)));
      span.mouseOver(highlight);
    }
  }
  //console.log(words);
}
