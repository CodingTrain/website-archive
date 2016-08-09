int popmax;
float mutationRate;
Population population;
PVector[] path = new PVector[100];

DNA bestEver;


void setup() {
  size(480, 360);
  randomSeed(5);
  //frameRate(3);
  popmax = 2500;
  mutationRate = 0.05;
  for (int i = 0; i < path.length; i++) {
    path[i] = new PVector(random(width), random(32, height));
  }
  bestEver = new DNA(path, false);
  population = new Population(path, mutationRate, popmax);
}

void draw() {
  background(0);
  population.calcFitness();
  DNA best = population.getBest();
  if (best.fitness > bestEver.fitness) {
    bestEver = best;
  }
  population.generate();
  beginShape();
  noFill();
  stroke(255, 150);
  strokeWeight(1);
  for (PVector v : best.genes) {
    vertex(v.x, v.y);
  }
  endShape();



  beginShape();
  noFill();
  stroke(255, 0, 255);
  strokeWeight(2);
  for (PVector v : bestEver.genes) {
    vertex(v.x, v.y);
  }
  endShape();

  for (PVector v : bestEver.genes) {
    fill(255);
    ellipse(v.x, v.y, 8, 8);
  }

  fill(255);
  textSize(24);
  text(population.generations + " generations", 10, 32);


  //if (record) {
  //  saveFrame("output/output####.png"); 
  //}

  //text(int(frameRate), 10, 16);
  //text(int(population.generations), 10, 32);
}



void shuffle(PVector[] list) {
  int a = int(random(list.length));
  int b = int(random(list.length));
  PVector temp = list[a];
  list[a] = list[b];
  list[b] = temp;
}

float sumDistance(PVector[] path) {
  float sum = 0;
  for (int i = 0; i < path.length-1; i++) {
    PVector a = path[i];
    PVector b = path[i+1];
    //float d = PVector.dist(a, b);
    float d = distSq(a.x, a.y, b.x, b.y);
    sum += d;
  }
  return sum;
}

float distSq(float x1, float y1, float x2, float y2) {
  return ((x2-x1)*(x2-x1) + (y2-y1)*(y2-y1));
}