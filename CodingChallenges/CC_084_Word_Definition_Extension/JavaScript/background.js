// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain

console.log('background running');

chrome.runtime.onMessage.addListener(receiver);

window.word = 'coding train';

function receiver(request, sender, sendResponse) {
  console.log(request);
  word = request.text;
}
