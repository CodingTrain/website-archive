// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/bGz7mv2vD6g

function Population() {
  //array of rockets
  this.rockets = [];
  //amount of rockets
  this.popsize = 25;
  // amount parent rocket partners
  this.matingpool = [];

  // associates a rocket to an array index
  for (var i = 0; i < this.popsize; i++) {
    this.rockets[i] = new Rocket();
  }
  
  this.evaluate = function() {

    var maxfit = 0;
    //iterate through all rockets and calcultes their fitness
    for (var i = 0; i < this.popsize; i++) {
      //calculates fitness
      this.rockets[i].calcFitness();
      //if current fitness is greater than max, then make max eqaul to current
      if (this.rockets[i].fitness > maxfit) {
        maxfit = this.rockets[i].fitness;
      }
    }
    //divides current fitness by max and makes that the current fitness
    for (var i = 0; i < this.popsize; i++) {
      this.rockets[i].fitness /= maxfit;
    }

    this.matingpool = [];
    // take rockets fitness make in to scale of 1 to 100
    // a rocket with high fitness will highly likely will be in the mating pool
    for (var i = 0; i < this.popsize; i++) {
      var n = this.rockets[i].fitness * 100;
      for (var j = 0; j < n; j++) {
        this.matingpool.push(this.rockets[i]);
      }
    }
  }
  //selects appropriate genes for child
  this.selection = function() {
    var newRockets = [];
    for (var i = 0; i < this.rockets.length; i++) {
      //picks random dna
      var parentA = random(this.matingpool).dna;
      var parentB = random(this.matingpool).dna;
      // creates child by using crossover function
      var child = parentA.crossover(parentB);
      child.mutation();
      // creates new rocket with child dna
      newRockets[i] = new Rocket(child);
    }
    //this instance of rockets are the new rockets
    this.rockets = newRockets;
  }
  
  // calls for update and show functions
  this.run = function() {
    for (var i = 0; i < this.popsize; i++) {
      this.rockets[i].update();
      //displays rockets to screen
      this.rockets[i].show();
    }
  }
}
