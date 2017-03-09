// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/bGz7mv2vD6g

function DNA(genes) {
  //recieves genes and create a dna object 
  if (genes) {
    this.genes = genes;
  } 
  //if no genes just create random dna
  else {
    this.genes = [];
    for (var i = 0; i < lifespan; i++) {
      //gives random vectors
      this.genes[i] = p5.Vector.random2D();
      //sets maximum force of vector to be applied to a rocket
      this.genes[i].setMag(maxforce);
    }
  }

  this.crossover = function(partner) {
    var newgenes = [];
    //picks random input
    var mid = floor(random(this.genes.length));
    for (var i = 0; i < this.genes.length; i++) {
      // if i is greater than mid the new gene should come from this partner
      if (i > mid) {
        newgenes[i] = this.genes[i];
      }
      //if i < mid new gene should come from other partners gene's 
      else {
        newgenes[i] = partner.genes[i];
      }
    }
    // gives DNA object an array
    return new DNA(newgenes);
  }

  this.mutation = function() {
    for (var i = 0; i < this.genes.length; i++) {
      if (random(1) < 0.01) {
        this.genes[i] = p5.Vector.random2D();
        this.genes[i].setMag(maxforce);
      }
    }
  }

}
