// Coding Train
// Ported to processing by Max (https://github.com/TheLastDestroyer)
// Origional JS by Daniel Shiffman
// http://patreon.com/codingtrain
// Code for this video: https://youtu.be/9Xy-LMAfglE

PVector[] cities;
int totalCities = 7;

int[] order;

int totalPermutations;
int count = 0;


float recordDistance;
int[] bestEver;

void setup() {
  size(400, 600);
  cities = new PVector[totalCities];
  order = new int[totalCities];
  bestEver = new int[totalCities];
  for (int i = 0; i < totalCities; i++) {
    PVector v = new PVector(random(width), random(height / 2));
    cities[i] = v;
    order[i] = i;
  }

  float d = calcDistance(cities, order);
  recordDistance = d;
  arrayCopy(order, bestEver);

  totalPermutations = factorial(totalCities);
  println(totalPermutations);

}

void draw() {
  background(0);
  //frameRate(5);
  fill(255);
  for (int i = 0; i < cities.length; i++) {
    ellipse(cities[i].x, cities[i].y, 8, 8);
  }

  stroke(255, 0, 255);
  strokeWeight(4);
  noFill();
  beginShape();
  for (int i = 0; i < order.length; i++) {
    int n = bestEver[i];
    vertex(cities[n].x, cities[n].y);
  }
  endShape();


  translate(0, height / 2);
  stroke(255);
  strokeWeight(1);
  noFill();
  beginShape();
  for (int i = 0; i < order.length; i++) {
    int n = order[i];
    vertex(cities[n].x, cities[n].y);
  }
  endShape();



  float d = calcDistance(cities, order);
  if (d < recordDistance) {
    recordDistance = d;
    arrayCopy(order, bestEver);
  }
  nextOrder();
  textSize(32);
  // var s = '';
  // for (var i = 0; i < order.length; i++) {
  //   s += order[i];
  // }
  fill(255);
  float percent = 100 * ((float) count / (float) totalPermutations);
  text(nf(percent, 0, 2) + "% completed", 20, height / 2 - 50);




}

void swap(int[] a, int i, int j) {
  int temp = a[i];
  a[i] = a[j];
  a[j] = temp;
}


float calcDistance(PVector[] points, int[] order) {
  float sum = 0;
  for (int i = 0; i < order.length - 1; i++) {
    int cityAIndex = order[i];
    PVector cityA = points[cityAIndex];
    int cityBIndex = order[i + 1];
    PVector cityB = points[cityBIndex];
    float d = dist(cityA.x, cityA.y, cityB.x, cityB.y);
    sum += d;
  }
  return sum;
}

// This is my lexical order algorithm

void nextOrder() {
  count++;

  // STEP 1 of the algorithm
  // https://www.quora.com/How-would-you-explain-an-algorithm-that-generates-permutations-using-lexicographic-ordering
  int largestI = -1;
  for (int i = 0; i < order.length - 1; i++) {
    if (order[i] < order[i + 1]) {
      largestI = i;
    }
  }
  if (largestI == -1) {
    noLoop();
    println("finished");
  }
  if (largestI != -1){
  // STEP 2
  int largestJ = -1;
  for (int j = 0; j < order.length; j++) {
    if (order[largestI] < order[j]) {
      largestJ = j;
    }
  }
  // STEP 3
  swap(order, largestI, largestJ);

  // STEP 4: reverse from largestI + 1 to the end
  int size = order.length - largestI - 1;
  int[] endArray = new int[size];
  arrayCopy(order, largestI + 1, endArray, 0, size);
  endArray = reverse(endArray);
  arrayCopy(endArray, 0, order, largestI+1, size);
}}

int factorial(int n) {
  if (n == 1) {
    return 1;
  } else {
    return n * factorial(n - 1);
  }
}
