// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain

// Promises, async and await
// This is the code at the end of all 4 videos
// I would welcome a pull request to have code for each video!
// https://youtu.be/XO77Fib9tSI
// https://youtu.be/chavThlNz3s
// https://youtu.be/01RTj1MWec0
// https://youtu.be/BztW_u6HDbs

// Note: In this file, "let" was changed to "const" where it was appropriate to be consistent with ES6. 

const wordnikAPI = "https://api.wordnik.com/v4/words.json/randomWord?&api_key=48dd829661f515d5abc0d03197a00582e888cc7da2484d5c7";
const giphyAPI = "https://api.giphy.com/v1/gifs/search?rating=G&api_key=dc6zaTOxFJmzC&q=";

function setup() {
  noCanvas();

  let promises = [];
  for (let i = 2; i < 10; i++) {
    promises.push(wordGIF(i));
  }
  Promise.all(promises)
    .then((results) => {
      for (let i = 0; i < results.length; i++) {
        createP(results[i].word);
        if (results[i].img !== null) {
          createImg(results[i].img);
        }
      }
    })
    .catch((err) => console.log(err));
}

async function wordGIF(num) {
  const response1 = await fetch(`${wordnikAPI}&minLength=${num}&maxLength=${num}`);
  const json1 = await response1.json();
  const response2 = await fetch(giphyAPI + json1.word);
  const json2 = await response2.json();
  let img_url = null;
  try {
    img_url = json2.data[0].images['fixed_height_small'].url;
  } catch (err) {
    console.log('no image found for ' + json1.word);
    console.error(err);
  }
  return {
    word: json1.word,
    img: img_url
  }
}
