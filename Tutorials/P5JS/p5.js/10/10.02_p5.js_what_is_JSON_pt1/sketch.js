/* 
https://vimeo.com/144162099
JSON Formatter & Validator (referred at 08:11) https://jsonformatter.curiousconcept.com/
(Shiffman tries to sing @ 11:24)
*/

var flower;

function preload() {
  flower = loadJSON('flower.json');
}

function setup() {
  createCanvas(400, 400);

  // flower = {
  //   name: "sunflower",
  //   col: color(200, 220, 0)
  // }
}

function draw() {
  background(0);
  fill(flower.r, flower.g, flower.b);
  text(flower.name, 10, 50);
}
