/*
Coding Train
Daniel Shiffman
https://www.youtube.com/thecodingtrain/
https://www.patreon.com/codingtrain

Tutorial
9.8: Random Circles with No Overlap - p5.js Tutorial
https://youtu.be/XATr_jdh-44
*/

let circles = [];

let counter = 0;

class Circle {

  constructor() {
    this.x = random(width);
    this.y = random(height);
    this.r = random(12, 48);
  }
}


function setup() {
  createCanvas(600, 600);

  while (circles.length < 1000) {
    let overlapping = false;
    let proposalCircle = new Circle;
    for (let j = 0; j < circles.length; j++) {
      let existingCircle = circles[j];
      let d = dist(proposalCircle.x, proposalCircle.y, existingCircle.x, existingCircle.y);
      if (d < proposalCircle.r + existingCircle.r) {
        overlapping = true;
        break;
      }
    }

    if (!overlapping) {
      circles.push(proposalCircle);
      noStroke();
      fill(0, 255, 250, 100);
      ellipse(proposalCircle.x, proposalCircle.y, proposalCircle.r * 2, proposalCircle.r * 2);
    }

    counter++;
    if (counter > 100000) {
      break;
    }
  }
}
