// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/GZ2nwxhQUTU

var fs = require('fs');
var data = fs.readFileSync('additional.json');
var afinndata = fs.readFileSync('afinn111.json');

var additional = JSON.parse(data);
// console.log(additional);
var afinn = JSON.parse(afinndata);

//console.log('server is starting');

var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');

var app = express();

var server = app.listen(3000, listening);

function listening() {
  console.log("listening. . . ");
}

app.use(express.static('website'));

var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({
  extended: true
})); // support encoded bodies

app.use(cors());

app.post('/analyze', analyzeThis);

function analyzeThis(request, response) {
  var txt = request.body.text;
  var words = txt.split(/\W+/);
  var totalScore = 0;
  var wordlist = [];
  for (var i = 0; i < words.length; i++) {
    var word = words[i];
    var score = 0;
    var found = false;
    if (additional.hasOwnProperty(word)) {
      score = Number(additional[word]);
      found = true;
    } else if (afinn.hasOwnProperty(word)) {
      score = Number(afinn[word]);
      found = true;
    }
    if (found) {
      wordlist.push({
        word: word,
        score: score
      });
    }
    totalScore += score;
  }

  var comp = totalScore / words.length;

  var reply = {
    score: totalScore,
    comparative: comp,
    words: wordlist
  }
  response.send(reply);
}

app.get('/add/:word/:score?', addWord);

function addWord(request, response) {
  var data = request.params;
  var word = data.word;
  var score = Number(data.score);
  var reply;
  if (!score && score !== 0) {
    var reply = {
      msg: "Score is required."
    }
    response.send(reply);
  } else {
    additional[word] = score;
    var data = JSON.stringify(additional, null, 2);
    fs.writeFile('additional.json', data, finished);

    function finished(err) {
      console.log('all set.');
      reply = {
        word: word,
        score: score,
        status: "success"
      }
      response.send(reply);
    }


  }

}

app.get('/all', sendAll);

function sendAll(request, response) {
  var data = {
    additional: additional,
    afinn: afinn
  }
  response.send(data);
}

app.get('/search/:word/', searchWord);

function searchWord(request, response) {
  var word = request.params.word;
  var reply;
  if (words[word]) {
    reply = {
      status: "found",
      word: word,
      score: words[word]
    }
  } else {
    reply = {
      status: "not found",
      word: word
    }
  }
  response.send(reply);
}