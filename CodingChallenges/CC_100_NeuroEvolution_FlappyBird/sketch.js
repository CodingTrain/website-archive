// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain

// Neuro-Evolution Flappy Bird


const TOTAL = 50;

let birds = [];
let savedBirds = [];
let pipes = [];
let counter = 0;
let slider;

function setup() {
  createCanvas(640, 480);
  slider = createSlider(1, 100, 1);
  for (let i = 0; i < TOTAL; i++) {
    brain = localStorage['brain'];
    if(brain == null) birds[i] = new Bird();
    else {
      birds[i] = new Bird(NeuralNetwork.deserialize( localStorage.getItem('brain')));

      birds[i].mutate(); //占쏙옙占쏙옙占쏙옙占쏙옙 占쏙옙占쏙옙占쏙옙 占쏙옙占쏙옙占쏙옙 占쏙옙占쏙옙占쏙옙 占쏙옙占쏙옙 占십듸옙占쏙옙

    }
  }
}

function draw() {

  for (let n = 0; n < slider.value(); n++) {

    if (counter % 100 == 0) {

      pipes.push(new Pipe());
    }
    counter++;

    for (let i = pipes.length - 1; i >= 0; i--) {
      pipes[i].update();

      for (let j = birds.length - 1; j >= 0; j--) {

        //占싣뤄옙 占쏙옙 占썸돌체크

        b= birds[j];
        if(b.y> height-1 || b.y < 1) {
          //     savedBirds.push(b);
          //console.log('col');
          savedBirds.push(birds.splice(j, 1)[0])
          continue;
        }

        if (pipes[i].hits(birds[j])) {
          savedBirds.push(birds.splice(j, 1)[0]);
        }
      }

      if (pipes[i].offscreen()) {
        pipes.splice(i, 1);
      }
    }
      for (let bird of birds) {
        bird.think(pipes);
        bird.update();

    }


    if (birds.length === 0) {
      counter = 0;
      nextGeneration();
      pipes = [];
    }
  }


  // All the drawing stuff
  background(0);


    for (let pipe of pipes) {
      pipe.show();
    }
  for (let bird of birds) {
    bird.show();


  }

  textSize(20);
  fill(255);
  stroke('red');
  text('birds : '+birds.length,10,30)


}
var keypresscnt=0;
function keyPressed() {
  if(keypresscnt++ % 600) {
    if (key == ' ') {
      birds[0].up();
      console.log("SPACE");
    }
}
}
