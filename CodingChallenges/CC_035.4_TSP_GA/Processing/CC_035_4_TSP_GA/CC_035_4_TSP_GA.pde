// Coding Train
// Ported to processing by Max (https://github.com/TheLastDestroyer)
// Origional JS by Daniel Shiffman
// http://patreon.com/codingtrain
// Code for this video: https://www.youtube.com/watch?v=M3KTWnTrU_c

PVector[] cities;
int totalCities = 12;

int popSize = 500;
IntList[] population;
float[] fitness;;

float recordDistance = Float.POSITIVE_INFINITY;
IntList bestEver;
IntList currentBest;


void setup() {
  size(800, 800);
  IntList order = new IntList();
  cities = new PVector[totalCities];
  population = new IntList[popSize];
  fitness = new float[popSize];
  
  for (int i = 0; i < totalCities; i++) {
    PVector v = new PVector(random(width), random(height / 2));
    cities[i] = v;
    order.append(i);
  }
  IntList orderCopy = order.copy();
  for (int i = 0; i < popSize; i++) {
    orderCopy.shuffle();
    population[i] = orderCopy;
  }
}

void draw() {
  background(0);

  // GA
  calculateFitness();
  normalizeFitness();
  nextGeneration();

  stroke(255);
  strokeWeight(4);
  noFill();
  beginShape();
  for (int i = 0; i < bestEver.size(); i++) {
    int n = bestEver.get(i);
    vertex(cities[n].x, cities[n].y);
    ellipse(cities[n].x, cities[n].y, 16, 16);
  }
  endShape();

  translate(0, height / 2);
  stroke(255);
  strokeWeight(4);
  noFill();
  beginShape();
  for (int i = 0; i < currentBest.size(); i++) {
    int n = currentBest.get(i);
    vertex(cities[n].x, cities[n].y);
    ellipse(cities[n].x, cities[n].y, 16, 16);
  }
  endShape();





}

// function shuffle(a, num) {
//   for (var i = 0; i < num; i++) {
//     var indexA = floor(random(a.length));
//     var indexB = floor(random(a.length));
//     swap(a, indexA, indexB);
//   }
// }


void swap(IntList a, int i, int j) {
  int temp = a.get(i);
  a.set(i, a.get(j));
  a.set(j, temp);
}


float calcDistance(PVector[] points, IntList order) {
  float sum = 0;
  for (int i = 0; i < order.size() - 1; i++) {
    int cityAIndex = order.get(i);
    PVector cityA = points[cityAIndex];
    int cityBIndex = order.get(i + 1);
    PVector cityB = points[cityBIndex];
    float d = dist(cityA.x, cityA.y, cityB.x, cityB.y);
    sum += d;
  }
  return sum;
}
