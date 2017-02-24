// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/DcoAjEZYies

var textfield;
var output;
var submit;

function setup() {
  noCanvas();
  // textfield = createInput("your favorite food");
  textfield = select("#txt");
  output = select('#output');
  submit = select("#submit");
  submit.mousePressed(newText);

}

function newText() {
  var s = textfield.value();

  var words = splitTokens(s, ', ');
  for (var i = 0; i < words.length; i++) {
    //createP(words[i]);
  }

  words = words.sort();
  s = join(words, ' ');
  createP(s);


  //var index = s.indexOf("rainbow");
  //var newtext = s.substring(s.length / 2, s.length);

  //createP(newtext);

  //createP(s.length);
  //createP(textfield.value());
}
