void nextGeneration(){
  Gens++;
  println("Generation "+ Gens);
  calculateFitness();
  for (int i = 0; i < TOTAL; i++){
    population.add(pickOne());
  }
  saved.clear();
}

bird pickOne(){
  int index = 0;
  float r = random(1);
  while (r > 0) {
    r -= saved.get(index).fitness;
    index++;
  }
  index--;
  bird b = saved.get(index);
  bird child = new bird(b.brain);
  child.mutate();
  return child;
}

void calculateFitness(){
  float sum = 0;
  for (bird b : saved){
    sum += b.score;
  }

  for (bird b : saved){
    b.fitness = b.score/sum;
  }
}
