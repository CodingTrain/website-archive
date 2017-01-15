// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/bGz7mv2vD6g

var population;
var lifespan = 400;
var lifeP;
var count = 0;
var target;
var maxforce = 0.2;

var rx = 100;
var ry = 150;
var rw = 200;
var rh = 10;

function setup() {
  createCanvas(400, 300);
  population = new Population();
  lifeP = createP();
  target = createVector(width / 2, 50);

}

function draw() {
  background(0);
  population.run();
  lifeP.html(count);

  count++;
  if (count == lifespan) {
    population.evaluate();
    population.selection();
    //population = new Population();
    count = 0;
  }

  fill(255);
  rect(rx, ry, rw, rh);

  ellipse(target.x, target.y, 16, 16);
}
