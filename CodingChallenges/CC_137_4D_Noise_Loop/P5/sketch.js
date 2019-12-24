// 4D Open Simplex Noise Loop
// Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/137-4d-opensimplex-noise-loop
// https://youtu.be/3_0Ax95jIrk

let capturer = new CCapture({
  format: 'png',
  name: 'open_simplex_noise_loop'
});

const totalFrames = 360;
let counter = 0;
const record = false;

const increment = 0.03;

// Just for non-looping demo
let zoff = 0;

let noise;
// the canvas variable is needed for the capturer
let canvas;
function setup() {
  // I made the canvas really small because it's slow for me otherwise
  canvas = createCanvas(200, 200).canvas;
  noise = new OpenSimplexNoise(Date.now());
  if (record) capturer.start();
}

function draw() {
  let percent = float(counter % totalFrames) / totalFrames;
  render(percent);
  if (record && counter < totalFrames - 1) {
    // note that canvas animations don't run in the background
    // you will have to keep the window open to record
    capturer.capture(canvas);
  } else if (record) {
    capturer.stop();
    capturer.save();
    // this will download a tar archive with the pngs inside
    // extract with 7zip or a similar tool
    // then use ffmpeg to convert into a gif or video
    noLoop();
  }
  counter++;
}

function render(percent) {
  let uoff, voff;
  // Only doing calculations if recording to save on computation
  if (record) {
    let angle = map(percent, 0, 1, 0, TWO_PI);
    uoff = map(sin(angle), -1, 1, 0, 2);
    voff = map(sin(angle), -1, 1, 0, 2);
  }

  let xoff = 0;
  for (let x = 0; x < width; x++) {
    let yoff = 0;
    for (let y = 0; y < height; y++) {
      let n;
      if (record) {
        // 4D Open Simplex Noise is very slow!
        n = noise.noise4D(xoff, yoff, uoff, voff);
      } else {
        // If you aren't worried about looping run this instead for speed!
        n = noise.noise3D(xoff, yoff, zoff);
      }
      let bright = n > 0 ? 255 : 0;
      stroke(bright);
      point(x, y);
      yoff += increment;
    }
    xoff += increment;
  }
  zoff += increment;
}
