class Population {  

  bestItem: PopulationItem;
  items: PopulationItem[];

  constructor(_popSize: number, _baseCityOrder: number[]) {
      this.items = [];
      for (var i = 0; i < _popSize; i++) {
      this.items.push(new PopulationItem(shuffle(_baseCityOrder)));
    }
  }

  calculateFitness() {
    let currentRecord = Infinity;
    for (let item of this.items) {
      
      item.distance = calcDistance(cities, item.cityOrder);
      item.fitness = 1 / (item.distance + 1);

      if (item.distance < currentRecord) {
        currentRecord = item.distance;
        this.bestItem = item;
      }
    }
  }

  normalizeFitness() {
    let sum = 0;
    for (let item of this.items) {
      sum += item.fitness;
    }
    for (let item of this.items) {
      item.fitness = item.fitness / sum;;
    }
  }

  nextGeneration() {
    let newPopulation = [];
    for (let item of this.items) {
      var orderA = GeneticAlgorithmHelper.pickOne(this.items);
      var orderB = GeneticAlgorithmHelper.pickOne(this.items);
      var order = GeneticAlgorithmHelper.crossOver(orderA, orderB);
      item.mutate(mutationRate);
      newPopulation.push(order);
    }
    this.items = newPopulation;
  }  
}