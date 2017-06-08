class PopulationItem {

  constructor(_cityOrder: number[]) {
    this.cityOrder = _cityOrder;
  }
  //Population Vars
  cityOrder: number[] = [];
  distance = Infinity;
  fitness = 0;

  mutate(mutationRate: number) {
    let totalCities = this.cityOrder.length;
    for (var i = 0; i < totalCities; i++) {
      if (random(1) < mutationRate) {
        var indexA = floor(random(this.cityOrder.length));
        var indexB = (indexA + 1) % totalCities;
        this.swap(this.cityOrder, indexA, indexB);
      }
    }
  }
  swap (a: any[], i: number, j: number) {
    var temp = a[i];
    a[i] = a[j];
    a[j] = temp;
  }
}