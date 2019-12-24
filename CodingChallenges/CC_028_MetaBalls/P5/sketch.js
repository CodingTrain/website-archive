// Basile Pesin
// http://vertmo.github.io

// MetaBalls : p5.js implementation

var blobs = [];

function setup() {
  createCanvas(400, 200);
  colorMode(HSB);
  for (i = 0; i < 10; i++)
    blobs.push(new Blob(random(0, width), random(0, height)));
}

function draw() {
  background(51);

  loadPixels();
  for (x = 0; x < width; x++) {
    for (y = 0; y < height; y++) {
      let sum = 0;
      for (i = 0; i < blobs.length; i++) {
        let xdif = x - blobs[i].x;
        let ydif = y - blobs[i].y;
        let d = sqrt(xdif * xdif + ydif * ydif);
        sum += (10 * blobs[i].r) / d;
      }
      set(x, y, color(sum, 255, 255));
    }
  }
  updatePixels();

  for (i = 0; i < blobs.length; i++) {
    blobs[i].update();
  }
}
