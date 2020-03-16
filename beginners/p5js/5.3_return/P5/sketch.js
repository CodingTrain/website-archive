// Functions and Return
// Code! Programming with p5.js
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/beginners/p5js/5.3-return.html
// https://youtu.be/qRnUBiTJ66Y
// https://editor.p5js.org/codingtrain/sketches/twpIiI-v

// println() is no longer part of p5.js use console.log(). For more info: https://p5js.org/reference/#/console/log

function setup() {
  // var angle = degrees(PI/2);
  // console.log(angle);

  var km = milesToKm(26.3);
  console.log(km);

  var km2 = milesToKm(100);
  console.log(km2);

  // console.log(milesToKm(90));
}

function milesToKm(miles) {
  var km = miles * 1.6;
  return km;
}
