// Smart Rockets
// The Nature of Code
// The Coding Train / Daniel Shiffman
// https://youtu.be/_of6UVV4HGo
// https://thecodingtrain.com/more/achive/nature-of-code/9-genetic-algorithms/9.5-fitness-genotype-vs-phenotype.html
// https://editor.p5js.org/codingtrain/sketches/BOTCxBDbO

// http://natureofcode.com

// Pathfinding w/ Genetic Algorithms

// DNA is an array of vectors

class DNA {
  constructor(newgenes) {
    // The maximum strength of the forces
    this.maxforce = 0.1;

    // The genetic sequence
    if (newgenes) {
      this.genes = newgenes;
    } else {
      this.genes = [];
      // Constructor (makes a DNA of random PVectors)
      for (let i = 0; i < lifetime; i++) {
        let angle = random(TWO_PI);
        this.genes[i] = createVector(cos(angle), sin(angle));
        this.genes[i].mult(random(0, this.maxforce));
      }
    }

    // Let's give each Rocket an extra boost of strength for its first frame
    this.genes[0].normalize();
  }

  // CROSSOVER
  // Creates new DNA sequence from two (this & and a partner)
  crossover(partner) {
    let child = new Array(this.genes.length);
    // Pick a midpoint
    let crossover = int(random(this.genes.length));
    // Take "half" from one and "half" from the other
    for (let i = 0; i < this.genes.length; i++) {
      if (i > crossover) child[i] = this.genes[i];
      else child[i] = partner.genes[i];
    }
    let newgenes = new DNA(child);
    return newgenes;
  }

  // Based on a mutation probability, picks a new random Vector
  mutate(m) {
    for (let i = 0; i < this.genes.length; i++) {
      if (random(1) < m) {
        let angle = random(TWO_PI);
        this.genes[i] = createVector(cos(angle), sin(angle));
        this.genes[i].mult(random(0, this.maxforce));
        //        let angle = random(-0.1,0.1);
        //        genes[i].rotate(angle);
        //        let factor = random(0.9,1.1);
        //        genes[i].mult(factor);
        if (i == 0) this.genes[i].normalize();
      }
    }
  }
}
