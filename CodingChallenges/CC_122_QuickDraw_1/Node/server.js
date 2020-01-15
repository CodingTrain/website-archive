// The Coding Train
// Coding Challenge 122.1
// Quick Draw
// https://youtu.be/yLuk0twx8Hc
// https://thecodingtrain.com/CodingChallenges/122.1-quick-draw
// Part 2: https://youtu.be/EcRK6oFddPQ
// https://thecodingtrain.com/CodingChallenges/122.2-quick-draw

const fs = require('fs');
const ndjson = require('ndjson');

let rainbows = [];
fs.createReadStream('rainbow.ndjson')
  .pipe(ndjson.parse())
  .on('data', function(obj) {
    rainbows.push(obj);
  });

let cats = [];
fs.createReadStream('cat.ndjson')
  .pipe(ndjson.parse())
  .on('data', function(obj) {
    cats.push(obj);
  });

const express = require('express');
const app = express();
const port = 3000;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});

app.get('/rainbow', (request, response) => {
  const index = Math.floor(Math.random() * rainbows.length);
  response.send(rainbows[index]);
});

app.get('/cat', (request, response) => {
  const index = Math.floor(Math.random() * cats.length);
  response.send(cats[index]);
});

app.use(express.static('public'));
