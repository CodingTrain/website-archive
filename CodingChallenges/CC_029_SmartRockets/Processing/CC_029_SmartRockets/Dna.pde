// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/bGz7mv2vD6g
// Processing transcription: Chuck England

import java.util.*;

int lifespan = 400;

class DNA {
  List<PVector> genes;

  DNA() {
    genes = new ArrayList<PVector>();

    for (int i = 0; i < lifespan; i++) {
      PVector gene = PVector.random2D();
      gene.setMag(maxforce);        
      genes.add(gene);
    }
  }

  DNA(List<PVector> genes_) {
    genes = new ArrayList<PVector>(genes_);
  }

  DNA crossover(DNA partner) {
    List<PVector> newgenes = new ArrayList<PVector>();
    int mid = (int) random(genes.size());
    for (int i = 0; i < genes.size(); i++) {
      if (i > mid) {
        newgenes.add(genes.get(i));
      } else {
        newgenes.add(partner.genes.get(i));
      }
    }
    return new DNA(newgenes);
  }

  void mutation() {
    for (int i = 0; i < genes.size(); i++) {
      if (random(i) < 0.01) {
        PVector gene = PVector.random2D();
        gene.setMag(maxforce);        
        genes.add(gene);
      }
    }
  }
}
