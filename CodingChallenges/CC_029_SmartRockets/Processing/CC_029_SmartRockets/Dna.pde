// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/bGz7mv2vD6g
// Processing transcription: Chuck England

import java.util.*;

int lifespan = 400;

class DNA {
  PVector[] genes;

  DNA() {
    genes = new PVector[lifespan];

    for (int i = 0; i < lifespan; i++) {
      PVector gene = PVector.random2D();
      gene.setMag(maxforce);        
      genes[i] = gene;
    }
  }

  DNA(PVector[] genes_) {
    genes = Arrays.copyOf(genes_, genes_.length);
  }

  DNA crossover(DNA partner) {
    PVector[] newgenes = new PVector[genes.length];
    int mid = (int) random(genes.length);
    for (int i = 0; i < genes.length; i++) {
      if (i > mid) {
        newgenes[i] = genes[i];
      } else {
        newgenes[i] = partner.genes[i];
      }
    }
    return new DNA(newgenes);
  }

  void mutation() {
    for (int i = 0; i < genes.length; i++) {
      if (random(i) < 0.01) {
        PVector gene = PVector.random2D();
        gene.setMag(maxforce);        
        genes[i] = gene;
      }
    }
  }
}
