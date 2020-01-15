// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/JUDYkxU6J0o
// Javascript transcription: Chuck England

// Note: This code was ported from Processing. It runs
//       very slowly in Javascript.

let img;
let sorted;
let index = 0;

function preload() {
  // try data/sunflower.jpg or data/sunflower400.jpg
  img = loadImage('data/sunflower100.jpg');
}

function setup() {
  createCanvas(200, 100);

  sorted = createImage(img.width, img.height);
  sorted = img.get();
}

function draw() {
  console.log(frameRate());

  sorted.loadPixels();

  // Selection sort!
  for (let n = 0; n < 1; n++) {
    let record = -1;
    let selectedPixel = index;
    for (let j = index; j < sorted.pixels.length; j += 4) {
      let pix = color(
        sorted.pixels[j],
        sorted.pixels[j + 1],
        sorted.pixels[j + 2],
        sorted.pixels[j + 3]
      );
      let b = hue(pix);
      if (b > record) {
        selectedPixel = j;
        record = b;
      }
    }

    // Swap selectedPixel with i
    let temp = [];
    temp[0] = sorted.pixels[index];
    temp[1] = sorted.pixels[index + 1];
    temp[2] = sorted.pixels[index + 2];
    temp[3] = sorted.pixels[index + 3];
    sorted.pixels[index] = sorted.pixels[selectedPixel];
    sorted.pixels[index + 1] = sorted.pixels[selectedPixel + 1];
    sorted.pixels[index + 2] = sorted.pixels[selectedPixel + 2];
    sorted.pixels[index + 3] = sorted.pixels[selectedPixel + 3];
    sorted.pixels[selectedPixel] = temp[0];
    sorted.pixels[selectedPixel + 1] = temp[1];
    sorted.pixels[selectedPixel + 2] = temp[2];
    sorted.pixels[selectedPixel + 3] = temp[3];

    if (index < sorted.pixels.length - 1) {
      index += 4;
    }
  }

  sorted.updatePixels();

  background(0);
  image(img, 0, 0);
  image(sorted, 100, 0);

  noStroke();
  fill(255);
}
