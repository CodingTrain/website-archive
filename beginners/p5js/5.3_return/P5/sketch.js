// Functions and Return
// Code! Programming with p5.js
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/beginners/p5js/5.3-return.html
// https://youtu.be/qRnUBiTJ66Y
// https://editor.p5js.org/codingtrain/sketches/

function setup() {
  // var angle = degrees(PI/2);
  // println(angle);

  var km = milesToKm(26.3);
  println(km);

  var km2 = milesToKm(100);
  println(km2);

  // println(milesToKm(90));
}

function milesToKm(miles) {
  var km = miles * 1.6;
  return km;
}
