var cities = [];
var totalCities = 10;

var recordDistance;
var bestEver;

var population = [];
var popTotal = 10;

function setup() {
  createCanvas(400, 600);
  for (var i = 0; i < totalCities; i++) {
    var v = createVector(random(width), random(height / 2));
    cities[i] = v;
  }
  // var d = calcDistance(cities, order);
  // recordDistance = d;
  // bestEver = order.slice();

  for (var i = 0; i < popTotal; i++) {
    population[i] = new DNA();
  }


}

function draw() {
  background(0);
  //frameRate(5);
  fill(255);
  for (var i = 0; i < cities.length; i++) {
    ellipse(cities[i].x, cities[i].y, 8, 8);
  }

  // stroke(255, 0, 255);
  // strokeWeight(4);
  // noFill();
  // beginShape();
  // for (var i = 0; i < order.length; i++) {
  //   var n = bestEver[i];
  //   vertex(cities[n].x, cities[n].y);
  // }
  // endShape();

  translate(0, height / 2);
  stroke(255);
  strokeWeight(1);
  noFill();
  for (var j = 0; j < population.length; j++) {
    beginShape();
    var order = population[j].order;
    for (var i = 0; i < order.length; i++) {
      var n = order[i];
      vertex(cities[n].x, cities[n].y);
    }
    endShape();
  }

  // var d = calcDistance(cities, order);
  // if (d < recordDistance) {
  //   recordDistance = d;
  //   bestEver = order.slice();
  // }
}

function swap(a, i, j) {
  var temp = a[i];
  a[i] = a[j];
  a[j] = temp;
}


function calcDistance(points, order) {
  var sum = 0;
  for (var i = 0; i < order.length - 1; i++) {
    var cityAIndex = order[i];
    var cityA = points[cityAIndex];
    var cityBIndex = order[i + 1];
    var cityB = points[cityBIndex];
    var d = dist(cityA.x, cityA.y, cityB.x, cityB.y);
    sum += d;
  }
  return sum;
}


function DNA() {
  this.order = [];
  for (var i = 0; i < totalCities; i++) {
    this.order[i] = i;
  }
  for (var n = 0; n < 10; n++) {
    var i = floor(random(this.order.length));
    var j = floor(random(this.order.length));
    swap(this.order, i, j);
  }


}
