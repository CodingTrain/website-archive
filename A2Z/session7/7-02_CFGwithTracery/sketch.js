// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/C3EwsSNJeOE

var story = {
  "start": "#[hero:#character#]story#",
  "character": ["dragon", "unicorn", "rainbow"],
  "story": "A #adj# #hero.capitalize# fights the #adj# monster. Go #hero# go!",
  "adj": ["dark", "sleepy", "quiet"]
}

var grammar;

function setup() {
  noCanvas();
  grammar = tracery.createGrammar(story);

  var result = grammar.flatten("#start#");
  console.log(result);
}