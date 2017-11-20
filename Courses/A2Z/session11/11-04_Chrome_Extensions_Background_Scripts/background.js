// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain

console.log('background running');

chrome.browserAction.onClicked.addListener(buttonClicked);

function buttonClicked(tab) {
  let msg = {
    txt: "hello"
  }
  chrome.tabs.sendMessage(tab.id, msg);
}
