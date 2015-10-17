/*
https://vimeo.com/channels/learningp5js/139587730
*/

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