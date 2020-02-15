// Julia Set
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/022-juliaset.html
// https://youtu.be/fAsaSkmbF5s
// https://editor.p5js.org/codingtrain/sketches/G6qbMmaI

// The biggest difference from the Processing version this is based on
// is that the pixel arrays do not have one index for each pixel, but
// instead have 4 indices for each pixel, representing the 4 color
// components for that pixel (red, green, blue and alpha).
//
// To set a single pixel, this code therefore has to multiply the
// indexes by 4, and then set 4 consecutive entries in the pixel array.
//
// However, since we're not using transparency here, and we have a
// background() call that fills the entire canvas with a color, we
// don't need to change the alpha value, so can set only the first 3.
//
//
// The next big difference is that this version of the code has three
// global arrays that it uses to set those entries in the pixels array,
// instead of calculating the color values to use for every pixel.
//
// This change was done because the code used to to calculate the color
// values is a bit slow. Since there are only 100 different values
// (from 0 up to maxiterations), there are only 100 different colors,
// so we can easily calculate them in advance and then use them later.
//
// To do this, the code for creating a color from how long it took to
// get to infinity was moved from draw() to setup(), with a loop that
// saves the color for every possible iteration count (aka value of n).
//
// Also, the maxiterations constant was moved to the top to be reused.

let angle = 0;

// Maximum number of iterations for each point on the complex plane
const maxiterations = 100;

// Colors to be used for each possible iteration count
const colorsRed = [];
const colorsGreen = [];
const colorsBlue = [];

function setup() {
  pixelDensity(1);
  createCanvas(640, 360);
  colorMode(HSB, 1);

  // Create the colors to be used for each possible iteration count
  for (let n = 0; n < maxiterations; n++) {
    // Gosh, we could make fancy colors here if we wanted
    let hu = sqrt(n / maxiterations);
    let col = color(hu, 255, 150);
    colorsRed[n] = red(col);
    colorsGreen[n] = green(col);
    colorsBlue[n] = blue(col);
  }
}

function draw() {
  // let ca = map(mouseX, 0, width, -1, 1); //-0.70176;
  // let cb = map(mouseY, 0, height, -1, 1); //-0.3842;

  let ca = cos(angle * 3.213); //sin(angle);
  let cb = sin(angle);

  angle += 0.02;

  background(255);

  // Establish a range of values on the complex plane
  // A different range will allow us to "zoom" in or out on the fractal

  // It all starts with the width, try higher or lower values
  //let w = abs(sin(angle)) * 5;
  let w = 5;
  let h = (w * height) / width;

  // Start at negative half the width and height
  let xmin = -w / 2;
  let ymin = -h / 2;

  // Make sure we can write to the pixels[] array.
  // Only need to do this once since we don't do any other drawing.
  loadPixels();

  // x goes from xmin to xmax
  let xmax = xmin + w;
  // y goes from ymin to ymax
  let ymax = ymin + h;

  // Calculate amount we increment x,y for each pixel
  let dx = (xmax - xmin) / width;
  let dy = (ymax - ymin) / height;

  // Start y
  let y = ymin;
  for (let j = 0; j < height; j++) {
    // Start x
    let x = xmin;
    for (let i = 0; i < width; i++) {
      // Now we test, as we iterate z = z^2 + cm does z tend towards infinity?
      let a = x;
      let b = y;
      let n = 0;
      while (n < maxiterations) {
        let aa = a * a;
        let bb = b * b;
        // Infinity in our finite world is simple, let's just consider it 16
        if (aa + bb > 4.0) {
          break; // Bail
        }
        let twoab = 2.0 * a * b;
        a = aa - bb + ca;
        b = twoab + cb;
        n++;
      }

      // We color each pixel based on how long it takes to get to infinity
      // If we never got there, let's pick the color black
      let pix = (i + j * width) * 4;
      if (n == maxiterations) {
        pixels[pix + 0] = 0;
        pixels[pix + 1] = 0;
        pixels[pix + 2] = 0;
      } else {
        // Otherwise, use the colors that we made in setup()
        pixels[pix + 0] = colorsRed[n];
        pixels[pix + 1] = colorsGreen[n];
        pixels[pix + 2] = colorsBlue[n];
      }
      x += dx;
    }
    y += dy;
  }
  updatePixels();
  console.log(frameRate());
}
