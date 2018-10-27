// Daniel Shiffman
// http://codingtra.in

// p5 editor version: // https://editor.p5js.org/codingtrain/full/Hy-ZhUGiQ
// Video: https://youtu.be/g7wEfamF0Eg

// Based on: https://gist.github.com/aparrish/2f562e3737544cf29aaf1af30362f469

// Based on: https://gist.github.com/aparrish/2f562e3737544cf29aaf1af30362f469
// by Allison Parrish

let data;
let vectors;
let rainbow;
let lines;

let rSlider, gSlider, bSlider;

let colorSpans = [];
let keys = [];

function preload() {
  data = loadJSON('xkcd.json');
  lines = loadStrings('rainbow.txt');
}

function setup() {
  noCanvas();
  rSlider = createSlider(-100, 100, 0);
  gSlider = createSlider(-100, 100, 0);
  bSlider = createSlider(-100, 100, 0);
  createP('');
  rSlider.input(sliderChanged);
  gSlider.input(sliderChanged);
  bSlider.input(sliderChanged);

  vectors = processData(data);
  rainbow = join(lines, ' ');
  let words = rainbow.split(/\W+/);
  for (let word of words) {
    let span = createSpan(word);
    if (vectors[word]) {
      let c = vectors[word];
      span.style('background-color', `rgb(${c.x},${c.y},${c.z})`);
      colorSpans.push(span);
      keys.push(word);
    }
    createSpan(' ');
  }

  console.log(keys);

  let avg = createVector(0, 0, 0);
  for (let key of keys) {
    let v = vectors[key];
    avg.add(v);
  }
  avg.div(keys.length);
  let nearest = findNearest(avg);
  console.log(nearest);

  background(avg.x, avg.y, avg.z);
}

function sliderChanged() {
  let r = rSlider.value();
  let g = gSlider.value();
  let b = bSlider.value();
  //console.log(r, g, b);

  for (let i = 0; i < colorSpans.length; i++) {
    let word = keys[i];
    let span = colorSpans[i];
    let v = vectors[word].copy();
    v.add(r, g, b);
    let nearest = findNearest(v);
    span.style('background-color', `rgb(${v.x},${v.y},${v.z})`);
    span.html(nearest);
  }
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
  return keys[0];
}

function distance(v1, v2) {
  return p5.Vector.dist(v1, v2);
}
