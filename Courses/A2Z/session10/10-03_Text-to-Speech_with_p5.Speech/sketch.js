// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/v0CHV33wDsI

let speech;

function setup() {
  createCanvas(400, 100);
  background(0);

  speech = new p5.Speech(); // speech synthesis object
  speech.onLoad = voiceReady;

  speech.started(startSpeaking);
  speech.ended(endSpeaking);

  function startSpeaking() {
    background(0, 255, 0);
  }

  function endSpeaking() {
    background(0);
  }

  function voiceReady() {
    console.log('voice ready');
    //console.log(speech.voices);
  }
}

function mousePressed() {
  let voices = speech.voices;
  let voice = random(voices);
  console.log(voice);
  // speech.setRate(1);
  // speech.setPitch(3);
  speech.setVoice(voice.name);
  speech.speak('Coding Train'); // say something
}
