// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain

// Neuro-Evolution Flappy Bird
var topScore = 1;

class Bird {
  constructor(brain) {
    this.y = height / 2;
    this.x = 64;
    this.gravity = 0.3;
    this.lift = -5;
    this.velocity = 0;

    this.score = 0;
    this.fitness = 0;
    if (brain) {
      this.brain = brain.copy();
    } else {
      this.brain = new NeuralNetwork(5,4,1);

    }
  }

  show() {
    text('top score : '+topScore,10,50);

    stroke(255);
    ellipse(this.x, this.y, 32, 32);
    fill(255, 100);
    stroke('red');
  }

  up(lift) {
    this.velocity += this.lift;

    //this.velocity -= lift*100;
  }
  down(lift) {
    this.velocity += this.lift;
    //this.gravity = lift*100;

  }
  mutate() {
  //초반 변형을 심하게 하여 빠른 진화
    if(topScore > 3000)
      this.brain.mutate(0.1);
    else if(topScore > 1000)
      this.brain.mutate(0.3);
    else  this.brain.mutate(0.5);

  }

  think(pipes) {

    // Find the closest pipe
    let closest = null;
    let closestD = Infinity;
    for (let i = 0; i < pipes.length; i++) {
      let d = pipes[i].x - this.x;
      if (d < closestD && d > 0) {
        closest = pipes[i];
        closestD = d;
      }
    }


    let inputs = [];
    inputs[0] = this.y / height;
    inputs[1] = closest.top / height;
    inputs[2] = closest.bottom / height;
    inputs[3] = closest.x / width;
    inputs[4] = this.velocity;
    let output = this.brain.predict(inputs);

    if (output[0] > 0.5){//output[1]) {
      this.up(output[1]);
    }


  }

  update() {
    this.score++;

    if(this.score > topScore) topScore = this.score;
    //하나만 세이브
   if(this == birds[0] && (this.score % 50000)==0){
        localStorage['gen_cnt'] = generation_cnt++;
        console.log("brain saved " + birds.length + " survived" )

        localStorage.setItem('brain',this.brain.serialize());
   }
    this.velocity += this.gravity;
    //this.velocity *= 0.9;
    this.y += this.velocity;

    if (this.y > height) {
      this.y = height;
      this.velocity = 0;
    }

    if (this.y < 0) {
      this.y = 0;
      this.velocity = 0;
    }

  }

}
