class GeneticAlgorithmHelper {
  static pickOne(items: PopulationItem[]) : PopulationItem {
    var index = 0;
    var r = random(1);

    while (r > 0) {
      r = r - items[index].fitness;
      index++;
    }
    index--;
    return items[index];
  }
  
  static crossOver(a: PopulationItem, b: PopulationItem): PopulationItem {
    var start = floor(random(a.cityOrder.length));
    var end = floor(random(start + 1, a.cityOrder.length));
    var neworder = a.cityOrder.slice(start, end);
    for (let city of b.cityOrder) {
      if (!neworder.includes(city)) {
        neworder.push(city);
      }
    }
    return new PopulationItem(neworder);;
  } 
}

