
var url1 = "https://api.wordnik.com/v4/word.json/";
var word = "rainbow";
var url2 = "/relatedWords?useCanonical=false&limitPerRelationshopType=10&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5";

var link;
function setup() {
  noCanvas();
  link = createA('#', word);
  link.mousePressed(askWordnik);
}

function askWordnik() {
  loadJSON(url1 + word + url2, gotData);
}

function gotData(data) {
  var index1 = floor(random(0, data.length));
  var index2 = floor(random(0, data[index1].words.length));
  word = data[index1].words[index2];
  link.html(word);
}
