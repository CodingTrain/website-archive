// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/bGz7mv2vD6g
// Processing transcription: Chuck England

Rocket rocket;
Population population;
PVector target;
float maxforce = 0.2;

int age;
float stat;

int generation = 0;

float barrierx;
float barriery;
float barrierw;
float barrierh;

void setup() {
  size(1024, 768);
  population = new Population();
  rocket = new Rocket();
  target = new PVector(width / 2, 50);
  age = 0;

  stat = 0;

  barrierw = width / 8;
  barrierh = 10;
  barrierx = (width - barrierw) / 2;
  barriery = (height - barrierh) / 2;
}

void draw() {
  background(5);

  // draw the target
  stroke(255);
  fill(128);
  ellipse(target.x, target.y, 20, 20);
  fill(100);
  noStroke();
  strokeWeight(2);
  ellipse(target.x+2, target.y-2, 10, 10);

  // draw the barrier
  fill(255, 0, 0);
  stroke(128);
  rectMode(CORNER);
  rect(barrierx, barriery, barrierw, barrierh);
  strokeWeight(1);
  stroke(55, 0, 0);
  line(barrierx, barriery-10, target.x-10, target.y+10);
  line(barrierx + barrierw, barriery-10, target.x+10, target.y+10);

  population.run();

  age++;
  if (age >= lifespan) {
    stat = population.evaluate();
    population.selection();
    age = 0;
    generation++;
  }

  textSize(18);
  noStroke();
  fill(255, 128, 0);
  text("Generation: " + generation, 20, 20);
  text("Age: " + age, 20, 40);
  if (stat != 0) {
    text("Stat: " + stat, 20, 60);
  }
}
