function calculateFitness() {
  var currentRecord = Infinity;
  for (var i = 0; i < population.length; i++) {
    var d = calcDistance(cities, population[i]);
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

function normalizeFitness() {
  var sum = 0;
  for (var i = 0; i < fitness.length; i++) {
    sum += fitness[i];
  }
  for (var i = 0; i < fitness.length; i++) {
    fitness[i] = fitness[i] / sum;;
  }
}

function nextGeneration() {
  var newPopulation = [];
  for (var i = 0; i < population.length; i++) {
    var orderA = pickOne(population, fitness);
    var orderB = pickOne(population, fitness);
    var order = crossOver(orderA, orderB);
    mutate(order, 0.01);
    newPopulation[i] = order;
  }
  population = newPopulation;

}

function pickOne(list, prob) {
  var index = 0;
  var r = random(1);

  while (r > 0) {
    r = r - prob[index];
    index++;
  }
  index--;
  return list[index].slice();
}

function crossOver(orderA, orderB) {
  var start = floor(random(orderA.length));
  var end = floor(random(start + 1, orderA.length));
  var neworder = orderA.slice(start, end);
  // var left = totalCities - neworder.length;
  for (var i = 0; i < orderB.length; i++) {
    var city = orderB[i];
    if (!neworder.includes(city)) {
      neworder.push(city);
    }
  }
  return neworder;
}


function mutate(order, mutationRate) {
  for (var i = 0; i < totalCities; i++) {
    if (random(1) < mutationRate) {
      var indexA = floor(random(order.length));
      var indexB = (indexA + 1) % totalCities;
      swap(order, indexA, indexB);
    }
  }
}
