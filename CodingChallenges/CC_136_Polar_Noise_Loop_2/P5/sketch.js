// Perlin Noise GIF Loops
// Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/136.2-perlin-noise-gif-loops.html
// https://youtu.be/c6K-wJQ77yQ

const totalFrames = 480;
let counter = 0;
let record = false;

let particles = new Array(100);

function setup() {
  createCanvas(600, 600);
  for (let i = 0; i < particles.length; i++) {
    particles[i] = new Particle();
  }


}

function draw() {
  let percent = 0;
  if (record) {
    percent = float(counter) / totalFrames;
  } else {
    percent = float(counter % totalFrames) / totalFrames;
  }
  render(percent);
  if (record) {
    saveFrame("output/gif-" + nf(counter, 3) + ".png");
    if (counter == totalFrames - 1) {
      exit();
    }
  }
  counter++;
}

function render(percent) {
  background(0);
  let a = percent * TWO_PI;
  for (let p of particles) {
    p.render(a);
  }

}