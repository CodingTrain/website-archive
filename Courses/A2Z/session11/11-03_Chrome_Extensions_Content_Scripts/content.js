// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain

console.log("Chrome extension go?");

let paragraphs = document.getElementsByTagName('p');
for (elt of paragraphs) {
  elt.style['background-color'] = '#FF00FF';
}
