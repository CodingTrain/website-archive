// Coding Train
// Ported to processing by Max (https://github.com/TheLastDestroyer)
// Origional JS by Daniel Shiffman
// http://patreon.com/codingtrain
// Code for this video: https://www.youtube.com/watch?v=M3KTWnTrU_c

void calculateFitness() {
  float currentRecord = Float.POSITIVE_INFINITY;
  for (int i = 0; i < population.length; i++) {
    float d = calcDistance(cities, population[i]);
    if (d < recordDistance) {
      recordDistance = d;
      bestEver = population[i];
    }
    if (d < currentRecord) {
      currentRecord = d;
      currentBest = population[i];
    }


    // This fitness function has been edited from the original video
    // to improve performance, as discussed in The Nature of Code 9.6 video,
    // available here: https://www.youtube.com/watch?v=HzaLIO9dLbA
    fitness[i] = 1 / (pow(d, 8) + 1);
  }
}

void normalizeFitness() {
  float sum = 0;
  for (int i = 0; i < fitness.length; i++) {
    sum += fitness[i];
  }
  for (int i = 0; i < fitness.length; i++) {
    fitness[i] = fitness[i] / sum;;
  }
}

void nextGeneration() {
  IntList[] newPopulation = new IntList[popSize];
  for (int i = 0; i < population.length; i++) {
    IntList orderA = pickOne(population, fitness);
    IntList orderB = pickOne(population, fitness);
    IntList order = crossOver(orderA, orderB);
    mutate(order, 0.01);
    newPopulation[i] = order;
  }
  population = newPopulation;

}

IntList pickOne(IntList[] list, float[] prob) {
  int index = 0;
  float r = random(1);

  while (r > 0) {
    r = r - prob[index];
    index++;
  }
  index--;
  return list[index].copy();
}

IntList crossOver(IntList orderA, IntList orderB) {
  int start = floor(random(orderA.size()));
  int end = floor(random(start + 1, orderA.size()));
  IntList neworder = new IntList();
  for (int i = start; i < end; i++){
    neworder.append(orderA.get(i));
  }
  
  // var left = totalCities - neworder.length;
  for (int i = 0; i < orderB.size(); i++) {
    int city = orderB.get(i);
    if (!neworder.hasValue(city)) {
      neworder.append(city);
    }
  }
  return neworder;
}


void mutate(IntList order, float mutationRate) {
  for (int i = 0; i < totalCities; i++) {
    if (random(1) < mutationRate) {
      int indexA = floor(random(order.size()));
      int indexB = (indexA + 1) % totalCities;
      swap(order, indexA, indexB);
    }
  }
}
