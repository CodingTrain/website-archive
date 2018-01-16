let kitten;

function preload() {
  kitten = loadImage("data/kitten.jpg");
}

function setup() {
  createCanvas(1024, 512);

  image(kitten, 0, 0);
  makeDithered(kitten, 1);
  image(kitten, 512, 0);
  // Apply gray filter to the whole canvas
  filter(GRAY);
}

function imageIndex(img, x, y) {
  return 4 * (x + y * img.width);
}

function getColorAtindex(img, x, y) {
  const idx = imageIndex(img, x, y);
  const pix = img.pixels;
  const red = pix[idx];
  const green = pix[idx + 1];
  const blue = pix[idx + 2];
  const alpha = pix[idx + 3];
  return color(red, green, blue, alpha);
}

function setColorAtIndex(img, x, y, clr) {
  const idx = imageIndex(img, x, y);

  const pix = img.pixels;
  pix[idx] = red(clr);
  pix[idx + 1] = green(clr);
  pix[idx + 2] = blue(clr);
  pix[idx + 3] = alpha(clr);
}

// Finds the closest step for a given value
// The step 0 is always included, so the number of steps
// is actually steps + 1
function closestStep(max, steps, value) {
  return round(steps * value / 255) * floor(255 / steps);
}

function makeDithered(img, steps) {
  img.loadPixels();

  for (let y = 0; y < img.height; y++) {
    for (let x = 0; x < img.width; x++) {
      const clr = getColorAtindex(img, x, y);
      const oldR = red(clr);
      const oldG = green(clr);
      const oldB = blue(clr);
      const newR = closestStep(255, steps, oldR);
      const newG = closestStep(255, steps, oldG);
      const newB = closestStep(255, steps, oldB);

      const newClr = color(newR, newG, newB);
      setColorAtIndex(img, x, y, newClr);

      const errR = oldR - newR;
      const errG = oldG - newG;
      const errB = oldB - newB;

      distributeError(img, x, y, errR, errG, errB);
    }
  }

  img.updatePixels();
}

function distributeError(img, x, y, errR, errG, errB) {
  addError(img, 7 / 16.0, x + 1, y, errR, errG, errB);
  addError(img, 3 / 16.0, x - 1, y + 1, errR, errG, errB);
  addError(img, 5 / 16.0, x, y + 1, errR, errG, errB);
  addError(img, 1 / 16.0, x + 1, y + 1, errR, errG, errB);
}

function addError(img, factor, x, y, errR, errG, errB) {
  if (x < 0 || x >= img.width || y < 0 || y >= img.height) return;
  const clr = getColorAtindex(img, x, y);
  const r = red(clr);
  const g = green(clr);
  const b = blue(clr);
  clr.setRed(r + errR * factor);
  clr.setGreen(g + errG * factor);
  clr.setBlue(b + errB * factor);

  setColorAtIndex(img, x, y, clr);
}
