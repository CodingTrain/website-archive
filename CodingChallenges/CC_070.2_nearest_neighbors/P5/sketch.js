// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain

// Machine Learning
// Nearest Neighbor Recommendations
// More: https://github.com/shiffman/NOC-S17-2-Intelligence-Learning/tree/master/week3-classification-regression

// Part 1: https://youtu.be/N8Fabn1om2k
// Part 2: https://youtu.be/Lo89NLmSgl0
// Part 3: https://youtu.be/aMtckmWAzDg

var data;
var users;

var resultP;
var resultDivs = [];

function preload() {
  data = loadJSON('movies.json');
}

function setup() {
  noCanvas();
  users = {};
  var dropdown1 = createSelect('');
  for (var i = 0; i < data.users.length; i++) {
    var name = data.users[i].name;
    dropdown1.option(name);
    users[name] = data.users[i];
  }

  var button = createButton('submit');
  button.mousePressed(findNearestNeigbhors);
  resultP = createP('');

  function findNearestNeigbhors() {
    for (var i = 0; i < resultDivs.length; i++) {
      resultDivs[i].remove();
    }
    resultDivs = [];

    var name = dropdown1.value();

    var similarityScores = {};
    for (var i = 0; i < data.users.length; i++) {
      var other = data.users[i].name;
      if (other != name) {
        var similarity = euclideanDistance(name, other);
        similarityScores[other] = similarity;
      } else {
        similarityScores[other] = -1;
      }
    }

    data.users.sort(compareSimilarity);

    function compareSimilarity(a, b) {
      var score1 = similarityScores[a.name];
      var score2 = similarityScores[b.name];
      return score2 - score1;
    }

    console.log(data.users);

    var k = 5;
    for (var i = 0; i < k; i++) {
      var name = data.users[i].name;
      var div = createDiv(name + ': ' + similarityScores[name]);
      resultDivs.push(div);
      resultP.parent(div);
    }

    // console.log(similarityScores);
  }
}

function euclideanDistance(name1, name2) {
  var ratings1 = users[name1];
  var ratings2 = users[name2];

  var titles = Object.keys(ratings1);
  var i = titles.indexOf('name');
  titles.splice(i, 1);
  var j = titles.indexOf('timestamp');
  titles.splice(j, 1);

  var sumSquares = 0;
  for (var i = 0; i < titles.length; i++) {
    var title = titles[i];
    var rating1 = ratings1[title];
    var rating2 = ratings2[title];
    if (rating1 != null && rating2 != null) {
      var diff = rating1 - rating2;
      sumSquares += diff * diff;
    }
  }
  var d = sqrt(sumSquares);

  var similarity = 1 / (1 + d);
  return similarity;
}
