// Daniel Shiffman
// http://codingrainbow.com
// http://patreon.com/codingrainbow
// Code for: https://youtu.be/fdyqutmcI2Q

var textfield;
var output;
var submit;

function setup() {
  noCanvas();
  textfield = select("#input");
  //textfield.changed(newText);
  output = select('#output');
  submit = select("#submit");
  submit.mousePressed(newText);
}

function newText() {
  var s = textfield.value();
  var r = /(\W+)/;
  var words = s.split(r);
  console.log(words);
  for (var i = 0; i < words.length; i++) {
    createP(words[i]);
  }





}
