// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/W7S_Vmq0GSs
//      and: https://youtu.be/t029QcVHtas

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

  var r = /(\d{3})[-.]\d{4}/g;
  // var matches = s.match(r);

  // var result = r.exec(s);
  var results;
  while (results = r.exec(s)) {
    createP(results[1]);
    // do something with the matched results
  }




}