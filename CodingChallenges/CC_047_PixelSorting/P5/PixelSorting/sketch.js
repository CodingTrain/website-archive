// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/JUDYkxU6J0o
// Javascript transcription: Chuck England

// Note: This code was ported from Processing. It runs
//       very slowly in Javascript.

let img;
let sorted;

function preload() {
  img = loadImage("data/sunflower.jpg");
}

function setup() {
  createCanvas(400, 200);

  sorted = img.get();
  sorted.loadPixels();

  let pixels = []
  for (let i = 0; i < sorted.pixels.length; i+=4) {
    pixels[i] = color(sorted.pixels[i], sorted.pixels[i + 1], sorted.pixels[i + 2], sorted.pixels[i + 3]);
  }
  console.log("copied")

  // Selection sort!
  for (let i = 0; i < pixels.length; i += 4) {
    let record = -1;
    
    let selectedPixel = i;
    for (let j = i; j < pixels.length; j += 4) {
      //let pix = color(sorted.pixels[j], sorted.pixels[j + 1], sorted.pixels[j + 2], sorted.pixels[j + 3]);
      // Sort by hue
      let b = hue(pixels[i]);
      if (b > record) {
        selectedPixel = j;
        record = b;
      }
    }

    // Swap selectedPixel with i
    let temp = pixels[i];
    pixels[i] = pixels[selectedPixel];
    pixels[selectedPixel] = temp;
    if (i % (200 * 4) === 0) {
      console.log(i)
    }
  }

  for (let i = 0; i < sorted.pixels.length; i+=4) {
    sorted.pixels[i] = red(sorted.pixels[i]);
    sorted.pixels[i+1] = green(sorted.pixels[i+1]);
    sorted.pixels[i+2] = blue(sorted.pixels[i+2]);
    sorted.pixels[i+3] = alpha(sorted.pixels[i+3]);
  }

  sorted.updatePixels();
}

function draw() {
  background(0);
  image(img, 0, 0);
  image(sorted, 200, 0);
  noLoop();
}