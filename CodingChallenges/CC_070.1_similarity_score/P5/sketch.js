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

var resultP;

function preload() {
  data = loadJSON('movies.json');
}

function setup() {
  noCanvas();
  var users = {};
  var dropdown1 = createSelect('');
  var dropdown2 = createSelect('');
  for (var i = 0; i < data.users.length; i++) {
    var name = data.users[i].name;
    dropdown1.option(name);
    dropdown2.option(name);
    users[name] = data.users[i];
  }

  var button = createButton('submit');
  button.mousePressed(euclideanSimilarity);

  resultP = createP('');

  function euclideanSimilarity() {
    var name1 = dropdown1.value();
    var name2 = dropdown2.value();

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
    resultP.html(similarity);
  }
}
