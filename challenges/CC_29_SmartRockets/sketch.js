// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/bGz7mv2vD6g

var population;
//each rocket is alive till 400 frames
var lifespan = 400;
// made to display count on screen
var lifeP;
//keeps track of frames
var count = 0;
//where rockets are trying to go
var target;
// max force applied to rocket
var maxforce = 0.2;

//dimensions of barrier
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
  //displays count to window
  lifeP.html(count);

  count++;
  if (count == lifespan) {
    population.evaluate();
    population.selection();
    //population = new Population();
    count = 0;
  }
  //renders barrier for rockets
  fill(255);
  rect(rx, ry, rw, rh);
  //renders target
  ellipse(target.x, target.y, 16, 16);
}
