// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

class Population {

  float mutationRate;           // Mutation rate
  DNA[] population;             // Array to hold the current population
  PVector[] path;                // Target phrase
  int generations;              // Number of generations

  Population(PVector[] p, float m, int num) {
    path = p;
    mutationRate = m;
    population = new DNA[num];
    for (int i = 0; i < population.length; i++) {
      population[i] = new DNA(path, true);
    }
    finished = false;
    generations = 0;
  }

  // Fill our fitness array with a value for every member of the population
  void calcFitness() {
    for (int i = 0; i < population.length; i++) {
      population[i].fitness();
    }
    float sum = 0;
    for (int i = 0; i < population.length; i++) {
      sum += population[i].fitness;
    }

    // Normalize all the fitness values
    for (int i = 0; i < population.length; i++) {
      population[i].normFitness = population[i].fitness / sum;
    }
  }


  int select() {
    int select = 0;
    float selector = random(1);
    while (selector > 0) {
      select = constrain(select, 0, population.length-1);
      selector-=population[select].normFitness;
      select+=1;
    }
    select-=1;
    select = constrain(select, 0, population.length-1);
    return select;
  }


  // Create a new generation
  void generate() {

    DNA[] newpop = new DNA[population.length];
    for (int i = 0; i < population.length; i++) {
      int a = select();
      int b = select();
      DNA partnerA = population[a];
      DNA partnerB = population[b];
      DNA child = partnerA.crossover(partnerB);
      child.mutate(mutationRate);
      newpop[i] = child;
    }
    generations++;
    population = newpop;
  }


  // Compute the current "most fit" member of the population
  DNA getBest() {
    float worldrecord = 0.0;
    int index = 0;
    for (int i = 0; i < population.length; i++) {
      if (population[i].fitness > worldrecord) {
        index = i;
        worldrecord = population[i].fitness;
      }
    }
    return population[index];
  }


  int getGenerations() {
    return generations;
  }

  // Compute average fitness for the population
  float getAverageFitness() {
    float total = 0;
    for (int i = 0; i < population.length; i++) {
      total += population[i].fitness;
    }
    return total / (population.length);
  }
}