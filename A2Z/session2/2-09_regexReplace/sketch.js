// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/7a-a6lKoyIQ

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
  var r = /(\d{3})-(\d{4})/g;

  var newstring = s.replace(r, replacer);
  createP(newstring);
}

function replacer(match, group1, group2) {
  console.log(arguments);
  console.log(arguments[0].length + arguments[1].length + arguments[2].length)
    // console.log(match);
    // console.log(group1);
    // console.log(group2);
  return match;
}








/**/