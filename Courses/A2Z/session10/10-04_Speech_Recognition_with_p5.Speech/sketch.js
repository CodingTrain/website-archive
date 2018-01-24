// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/q_bXBcmfTJM

function setup() {
  noCanvas();
  let lang = navigator.language || 'en-US';
  let speechRec = new p5.SpeechRec(lang, gotSpeech);

  let continuous = true;
  let interim = true;
  speechRec.start(continuous, interim);

  function gotSpeech() {
    if (speechRec.resultValue) {
      createP(speechRec.resultString);
    }
  }

}
