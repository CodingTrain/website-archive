// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

class DNA {

  // The genetic sequence
  PVector[] genes;

  float fitness;
  float normFitness;

  // Constructor (makes a random DNA)
  DNA(PVector[] path, boolean shuffle) {
    genes = new PVector[path.length];
    System.arraycopy(path, 0, genes, 0, path.length );
    if (shuffle) {
      for (int i = 0; i < 100; i++) {
        shuffle(genes);
      }
    }
  }

  void fitness () {
    float sum = sumDistance(genes);
    fitness = 1.0 / sum;
    fitness = pow(fitness, 4);
    //println(fitness);
    //int score = 0;
    //for (int i = 0; i < genes.length; i++) {
    //   if (genes[i] == target.charAt(i)) {
    //     score++;
    //   }
    //}


    //fitness = (float)score / (float)target.length();
  }

  // Crossover
  DNA crossover(DNA partner) {

    PVector[] dna = new PVector[genes.length];

    int start = int(random(genes.length));
    int end = int(random(start, genes.length));

    for (int i = start; i < end; i++) {
      dna[i] = genes[i];
    }

    int index = 0;
    if (start == 0) {
      index = end;
    }
    for (int i = 0; i < partner.genes.length; i++) {
      PVector v = partner.genes[i];
      boolean ok = true;
      for (int j = start; j < end; j++) {
        if (genes[j] == v) {
          ok = false;
        }
      }
      if (ok) {
        dna[index] = v;
        index++;
        if (index == start) {
          index = end;
        }
      }
    }


    return new DNA(dna, false);
  }



  // Based on a mutation probability, picks a new random character
  void mutate(float mutationRate) {
    for (int n = 0; n < genes.length; n++) {
      if (random(1) < mutationRate) {
        if (random(1) < 0.5) {
          shuffle(genes);
        } else {
          int r1 = n;//int(random(genes.length));
          PVector removed = genes[r1];
          PVector[] truncated = new PVector[genes.length-1];
          for (int i = 0; i < truncated.length; i++) {
            if (i < r1) {
              truncated[i] =  genes[i];
            } else {
              truncated[i] = genes[i+1];
            }
          }
          int r2 = int(random(truncated.length));
          for (int i = 0; i < genes.length; i++) {
            if (i < r2) {
              genes[i] = truncated[i];
            } else if (i == r2) {
              genes[i] = removed;
            } else {
              genes[i] = truncated[i-1];
            }
          }
        }
      }
    }
  }
}