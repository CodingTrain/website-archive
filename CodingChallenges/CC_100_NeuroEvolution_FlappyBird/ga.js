// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain

// Neuro-Evolution Flappy Bird
let generation_cnt=0;
function nextGeneration() {
  console.log('next generation');
  generation_cnt++;
  calculateFitness();
  for (let i = 0; i < TOTAL; i++) {
    pickedBrain = pickOne();
//    localStorage.setItem('brain',pickedBrain.serialize());
//     console.log( localStorage['brain']);
    let child = new Bird(pickedBrain);
    child.mutate();
    birds[i] = child;
    birds[i].mutate();
  }
  savedBirds = [];
}

function pickOne() {
  var index = 0;
  var r = random(1);
  while (r > 0) {
    r = r - savedBirds[index].fitness;
    index++;
  }
  index--;
  let bird = savedBirds[index];
  return (bird.brain)
}

function calculateFitness() {
  let sum = 0;
  for (let bird of savedBirds) {
    sum += bird.score;
  }
  for (let bird of savedBirds) {
    bird.fitness = bird.score / sum;
  }
}
