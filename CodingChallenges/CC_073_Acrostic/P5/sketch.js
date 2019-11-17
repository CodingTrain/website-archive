// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain

// Acrostic
// Video: https://youtu.be/jwoK5WKVXGw

let url1 = 'https://api.wordnik.com:80/v4/words.json/search/';
let url2 =
  '?caseSensitive=true&minCorpusCount=1&maxCorpusCount=25&minDictionaryCount=1&maxDictionaryCount=-1&minLength=6&maxLength=-1&skip=1&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5';

function setup() {
  noCanvas();
  let button = select('#submitbutton');
  let input = select('#wordinput');

  button.mousePressed(makeAcrostic);

  function pickWord(div, letter) {
    let url = url1 + letter + url2;
    loadJSON(url, gotData);
    function gotData(data) {
      let options = data.searchResults;
      let selection = random(options);
      div.html(selection.word);
    }
  }

  function makeAcrostic() {
    let word = input.value();

    for (let i = 0; i < word.length; i++) {
      let letter = word.charAt(i);
      let div = createDiv('');
      pickWord(div, letter);
    }
  }
}
