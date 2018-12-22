// Daniel Shiffman
// http://codingtra.in

// https://youtu.be/mI23bDF0VRI

// Based on: https://gist.github.com/aparrish/2f562e3737544cf29aaf1af30362f469
// by Allison Parrish

let data;
let vectors;

let pos;

let div;

function preload() {
  data = loadJSON('xkcd.json');
}

function setup() {
  createCanvas(100, 100);
  //console.log(data);
  vectors = processData(data);
  console.log(vectors);
  // pos = createVector(random(255), random(255), random(255));
  pos = createVector(0, 0, 255);
  div = createDiv('');
}

function draw() {
  background(0);

  let colorName = findNearest(pos);
  div.html(colorName);
  let v = vectors[colorName];
  div.style('color', `rgb(${v.x},${v.y},${v.z})`);

  fill(v.x, v.y, v.z);
  ellipse(50, 50, 100);

  let r = p5.Vector.random3D();
  r.mult(50);
  pos.add(r);
  pos.x = constrain(pos.x, 0, 255);
  pos.y = constrain(pos.y, 0, 255);
  pos.z = constrain(pos.z, 0, 255);
  frameRate(2);
}

function processData(data) {
  let vectors = {};
  let colors = data.colors;
  for (let i = 0; i < colors.length; i++) {
    let label = colors[i].color;
    let rgb = color(colors[i].hex);
    vectors[label] = createVector(red(rgb), green(rgb), blue(rgb));
  }
  return vectors;
}

function findNearest(v) {
  let keys = Object.keys(vectors);
  keys.sort((a, b) => {
    let d1 = distance(v, vectors[a]);
    let d2 = distance(v, vectors[b]);
    return d1 - d2;
  });
  // console.log(v);
  //console.log(vectors[keys[0]]);
  //console.log(keys);

  return keys[0];
}

function distance(v1, v2) {
  return p5.Vector.dist(v1, v2);
}
