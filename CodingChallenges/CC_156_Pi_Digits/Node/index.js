// Pi Day Digit Search
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/156-pi-digits.html
// https://youtu.be/
// https://editor.p5js.org/codingtrain/sketches/U649qYR4

const fs = require('fs');
const express = require('express');
const app = express();
app.listen(3000, () => console.log('listening at 3000'));
app.use(express.static('public'));

let digits = '';

app.get('/search/:digits', (request, response) => {
  console.log(request.params.digits);
  let search = request.params.digits;
  const index = indexOf(digits, search);
  response.send({
    index: index - 1,
    search: search
  });
});

const stream = fs.createReadStream('pi-billion.txt');

stream.on('data', chunk => {
  digits += chunk;
});

function indexOf(txt, search) {
  let start = search.charAt(0);
  for (let i = 0; i < txt.length; i++) {
    if (txt.charAt(i) === start) {
      let found = true;
      for (let j = 1; j < search.length; j++) {
        if (txt.charAt(i + j) !== search.charAt(j)) {
          found = false;
          break;
        }
      }
      if (found) {
        return i;
      }
    }
  }
  return -1;
}

stream.on('end', () => {
  console.log('billion digits loaded');
});
