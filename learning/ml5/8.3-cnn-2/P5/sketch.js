// ml5.js: What is a Convolutional Neural Network Part 2 - Max Pooling
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/learning/ml5/8.3-cnn-2.html
// https://youtu.be/pRWq_mtuppU
// https://editor.p5js.org/codingtrain/sketches/GMRfsK7Wn

let cat;
let filtered;
let pooled;
let stride = 2;

let dim = 28;

function preload() {
  cat = loadImage('cat.png');
}

let filter = [
  [-1, 1, 0],
  [-1, 1, 0],
  [-1, 1, 0]
];

function setup() {
  // for (let i = 0; i < 3; i++) {
  //   for (let j = 0; j < 3; j++) {
  //     filter[i][j] = random(-1, 1);
  //   }
  // }

  createCanvas(dim * 10 * 2, dim * 10 * 2);
  filtered = createImage(dim, dim);
  pooled = createImage(dim / stride, dim / stride);
  background(255);
  noSmooth();
  image(cat, 0, 0, dim * 10, dim * 10);
  cat.loadPixels();

  // Convolution Layer
  filtered.loadPixels();
  for (let x = 1; x < dim - 1; x++) {
    for (let y = 1; y < dim - 1; y++) {
      let rgb = convolution(cat, x, y, filter);
      let pix = index(x, y, cat);
      filtered.pixels[pix + 0] = rgb.r;
      filtered.pixels[pix + 1] = rgb.g;
      filtered.pixels[pix + 2] = rgb.b;
      filtered.pixels[pix + 3] = 255;
    }
  }
  filtered.updatePixels();
  image(filtered, dim * 10, 0, dim * 10, dim * 10);

  // Pooling
  pooled.loadPixels();
  for (let x = 0; x < dim - 1; x += stride) {
    for (let y = 0; y < dim - 1; y += stride) {
      let rgb = pooling(filtered, x, y);

      let px = x / stride;
      let py = y / stride;
      let pix = index(px, py, pooled);
      pooled.pixels[pix + 0] = rgb.r;
      pooled.pixels[pix + 1] = rgb.g;
      pooled.pixels[pix + 2] = rgb.b;
      pooled.pixels[pix + 3] = 255;
    }
  }
  pooled.updatePixels();

  image(pooled, dim * 10, dim * 10, dim * 10, dim * 10);
}

function index(x, y, img) {
  return (x + y * img.width) * 4;
}

function pooling(img, x, y) {
  let brightR = -Infinity;
  let brightG = -Infinity;
  let brightB = -Infinity;
  for (let i = 0; i < stride; i++) {
    for (let j = 0; j < stride; j++) {
      let pix = index(x + i, y + j, img);
      let r = img.pixels[pix + 0];
      let g = img.pixels[pix + 1];
      let b = img.pixels[pix + 2];
      brightR = max(brightR, r);
      brightG = max(brightG, g);
      brightB = max(brightB, b);
    }
  }
  return {
    r: brightR,
    g: brightG,
    b: brightB
  };
}

function convolution(img, x, y, filter) {
  let sumR = 0;
  let sumG = 0;
  let sumB = 0;
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      let pix = index(x + i, y + j, img);
      let factor = filter[j + 1][i + 1];
      sumR += img.pixels[pix + 0] * factor;
      sumG += img.pixels[pix + 1] * factor;
      sumB += img.pixels[pix + 2] * factor;
    }
  }

  return {
    r: sumR,
    g: sumG,
    b: sumB
  };
}
