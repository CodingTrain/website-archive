// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain

// Neuro-Evolution Flappy Bird

const TOTAL = 100;
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
      birds[i].mutate(); //변종으로 생성해 동일한 동작을 하지 않도록
    }
  }
}

function draw() {

  for (let n = 0; n < slider.value(); n++) {
    if (counter % 75 == 0) {
      pipes.push(new Pipe());
    }
    counter++;

    for (let i = pipes.length - 1; i >= 0; i--) {
      pipes[i].update();

      for (let j = birds.length - 1; j >= 0; j--) {
        //아래 위 충돌체크
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

  for (let bird of birds) {
    bird.show();
  }

  for (let pipe of pipes) {
    pipe.show();
  }





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
