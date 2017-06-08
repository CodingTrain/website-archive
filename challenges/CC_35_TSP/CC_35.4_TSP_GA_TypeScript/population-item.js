class PopulationItem {
    constructor(_cityOrder) {
        this.cityOrder = [];
        this.distance = Infinity;
        this.fitness = 0;
        this.cityOrder = _cityOrder;
    }
    mutate(mutationRate) {
        let totalCities = this.cityOrder.length;
        for (var i = 0; i < totalCities; i++) {
            if (random(1) < mutationRate) {
                var indexA = floor(random(this.cityOrder.length));
                var indexB = (indexA + 1) % totalCities;
                this.swap(this.cityOrder, indexA, indexB);
            }
        }
    }
    swap(a, i, j) {
        var temp = a[i];
        a[i] = a[j];
        a[j] = temp;
    }
}
//# sourceMappingURL=population-item.js.map