// Smart Rockets
// The Nature of Code
// The Coding Train / Daniel Shiffman
// https://youtu.be/_of6UVV4HGo
// https://thecodingtrain.com/more/achive/nature-of-code/9-genetic-algorithms/9.5-fitness-genotype-vs-phenotype.html
// https://editor.p5js.org/codingtrain/sketches/BOTCxBDbO

// http://natureofcode.com

// Pathfinding w/ Genetic Algorithms

// A class for an obstacle, just a simple rectangle that is drawn
// and can check if a Rocket touches it

// Also using this class for target position

class Obstacle {
  constructor(x, y, w, h) {
    this.position = createVector(x, y);
    this.w = w;
    this.h = h;
  }

  display() {
    stroke(0);
    fill(175);
    strokeWeight(2);
    rectMode(CORNER);
    rect(this.position.x, this.position.y, this.w, this.h);
  }

  contains(spot) {
    if (
      spot.x > this.position.x &&
      spot.x < this.position.x + this.w &&
      spot.y > this.position.y &&
      spot.y < this.position.y + this.h
    ) {
      return true;
    } else {
      return false;
    }
  }
}
