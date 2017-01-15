// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/9r8CmofnbAQ

//var txt = "the theremin is theirs, ok? yes, it is. this is a theremin.";
//var txt = "The unicorn is a legendary creature that has been described since antiquity as a beast with a large, pointed, spiraling horn projecting from its forehead. The unicorn was depicted in ancient seals of the Indus Valley Civilization and was mentioned by the ancient Greeks in accounts of natural history by various writers, including Ctesias, Strabo, Pliny the Younger, and Aelian.[1] The Bible also describes an animal, the re'em, which some translations have erroneously rendered with the word unicorn.[1] In European folklore, the unicorn is often depicted as a white horse-like or goat-like animal with a long horn and cloven hooves (sometimes a goat's beard). In the Middle Ages and Renaissance, it was commonly described as an extremely wild woodland creature, a symbol of purity and grace, which could only be captured by a virgin. In the encyclopedias its horn was said to have the power to render poisoned water potable and to heal sickness. In medieval and Renaissance times, the tusk of the narwhal was sometimes sold as unicorn horn.";
var names;
var order = 2;
var ngrams = {};
var beginnings = [];
var button;

function preload() {
  names = loadStrings('names.txt');
  console.log(names);
}

function setup() {
  noCanvas();
  for (var j = 0; j < names.length; j++) {
    var txt = names[j];
    for (var i = 0; i <= txt.length - order; i++) {
      var gram = txt.substring(i, i + order);
      if (i == 0) {
        beginnings.push(gram);
      }

      if (!ngrams[gram]) {
        ngrams[gram] = [];
      }
      ngrams[gram].push(txt.charAt(i + order));
    }
  }
  button = createButton("generate");
  button.mousePressed(markovIt);
  console.log(ngrams);
}

function markovIt() {

  var currentGram = random(beginnings);
  var result = currentGram;

  for (var i = 0; i < 20; i++) {
    var possibilities = ngrams[currentGram];
    if (!possibilities) {
      break;
    }
    var next = random(possibilities);
    result += next;
    var len = result.length;
    currentGram = result.substring(len - order, len);
  }

  createP(result);
}