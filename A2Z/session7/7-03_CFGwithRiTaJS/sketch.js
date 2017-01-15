// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/VaAoIaZ3YKs

var rg;
var button;

function setup() {
  noCanvas();

  rg = new RiGrammar();
  rg.loadFrom('grammar.json', grammarReady);

  function grammarReady() {
    console.log('ready');
    // console.log(result);
  }

  button = createButton('generate');
  button.mousePressed(newHaiku);
  // rg.addRule('<start>', 'The <N> <V>.');
  // rg.addRule('<N>', 'cat | unicorn | dog');
  // rg.addRule('<V>', 'meows | barks | twillips');
  // for (var i = 0; i < 100; i++) {
  //   var result = rg.expand();
  //   console.log(result);
  // }
}

function newHaiku() {
  var result = rg.expand();
  createP(result);
}