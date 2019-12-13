// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/ziBO-U2_t3k

var data;

var txt =
  '$$Exclamation$$! they said $$Adverb$$ as they jumped into their $$Noun$$ and flew off with their $$Adjective$$ $$PluralNoun$$.';

function setup() {
  noCanvas();
  Tabletop.init({
    key: '15WyEmfu6B1UCzzqeacYnzI8lutrxF6uWvFDiSteBqTs',
    callback: gotData,
    simpleSheet: true
  });

  var button = createButton('generate madlib');
  button.mousePressed(generate);
}

function replacer(match, pos) {
  var entry = random(data);
  return entry[pos];
}

function generate() {
  //console.log('generate');
  var madlib = txt.replace(/\$\$(.*?)\$\$/g, replacer);
  createP(madlib);
}

function gotData(stuff, tabletop) {
  data = stuff;
}
