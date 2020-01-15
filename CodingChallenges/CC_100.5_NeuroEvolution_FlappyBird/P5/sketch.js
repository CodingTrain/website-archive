// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain

// Neuro-Evolution Flappy Bird

// Part 1: https://youtu.be/c6y21FkaUqw
// Part 2: https://youtu.be/tRA6tqgJBc
// Part 3: https://youtu.be/3lvj9jvERvs
// Part 4: https://youtu.be/HrvNpbnjEG8
// Part 5: https://youtu.be/U9wiMM3BqLU

let pipes = [];
let slider;
let bird;
let counter = 0;

let brainJSON;

function preload() {
  brainJSON = loadJSON('best_bird.json');
  //brainJSON = loadJSON("bad_bird.json");
}

function setup() {
  createCanvas(640, 480);
  slider = createSlider(1, 10, 1);
  let birdBrain = NeuralNetwork.deserialize(brainJSON);
  bird = new Bird(birdBrain);
}

function draw() {
  for (let n = 0; n < slider.value(); n++) {
    if (counter % 75 == 0) {
      pipes.push(new Pipe());
    }
    counter++;

    for (let i = pipes.length - 1; i >= 0; i--) {
      pipes[i].update();

      if (pipes[i].hits(bird)) {
        console.log('collision');
      }
      if (pipes[i].offscreen()) {
        pipes.splice(i, 1);
      }
    }

    if (bird.offScreen()) {
      console.log('bottom');
    }

    bird.think(pipes);
    bird.update();

    // All the drawing stuff
    background(0);

    bird.show();

    for (let pipe of pipes) {
      pipe.show();
    }
  }
}

// function keyPressed() {
//   if (key == ' ') {
//     bird.up();
//     //console.log("SPACE");
//   }
// }
