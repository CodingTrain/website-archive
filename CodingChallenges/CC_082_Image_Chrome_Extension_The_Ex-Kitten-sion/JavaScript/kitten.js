// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain

console.log('Kittens of the world, unite as one!');

let filenames = [
  'freddie-marriage-40645.jpg',
  'koen-eijkelenboom-353684.jpg',
  'mikhail-vasilyev-130018.jpg',
  'mikhail-vasilyev-253977.jpg',
  'roxanne-desgagnes-277568.jpg'
];

let imgs = document.getElementsByTagName('img');

for (let imgElt of imgs) {
  let r = Math.floor(Math.random() * filenames.length);
  let file = 'kittens/' + filenames[r];
  let url = chrome.extension.getURL(file);
  imgElt.src = url;
  console.log(url);
}
