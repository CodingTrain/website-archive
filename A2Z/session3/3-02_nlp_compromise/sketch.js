// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/tk_JGu2AbJY

var input;
var button;

var nlp = window.nlp_compromise;

function setup() {
  noCanvas();
  input = createInput('It was a dark and stormy night.');
  button = createButton('submit');
  button.mousePressed(process);
  input.size(200);
}

function process() {
  var s = input.value();
  var sentence = nlp.sentence(s);
  var output = '';
  for (var i = 0; i < sentence.terms.length; i++) {
    var pos = sentence.terms[i].pos;
    var word = sentence.terms[i].text;
    if (pos.Noun && !pos.Pronoun) {
      word = nlp.noun(word).pluralize();
    } else if (pos.Verb) {
      word = nlp.verb(word).conjugate().future;
    }
    output += word;
    output += sentence.terms[i].whitespace.trailing;
  }
  createP(output);
}