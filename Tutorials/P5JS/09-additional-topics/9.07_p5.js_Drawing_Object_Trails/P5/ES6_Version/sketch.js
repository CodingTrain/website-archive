let vibrations = [];
let anim = 0;

function setup() {
  createCanvas(600, 600);

  for (let i = 0; i < 4; i++) {
    vibrations.push(new Particle(random(width), random(height)));
  }

}

function draw() {
  background(70);

  push();
  stroke(255);
  line(anim, 0, anim, height);
  anim++;
  if (anim > width) {
    anim = 0;
  }
  pop();

  for (let i = 0; i < vibrations.length; i++) {
    vibrations[i].show();
    vibrations[i].update();
  }
}

function mousePressed() {
  vibrations.push(new Particle(mouseX, mouseY));
}

class Particle {

  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.history = [];
  }

  update() {
    this.x = this.x + random(-10, 10);
    this.y = this.y + random(-10, 10);

    let v = createVector(this.x, this.y);

    this.history.push(v);
    //console.log(this.history.length);

    if (this.history.length > 100) {
      this.history.splice(0, 1);
    }

    if (this.x > width || this.x < 0 || this.y > height || this.y < 0) {
      this.x = width / 2;
      this.y = height / 2;
    }

    for (let i = 0; i < this.history.length; i++) {
      this.history[i].x += random(-5, 5);
      this.history[i].y += random(-5, 5);
    }
  }

  show() {
    // beginShape();
    for (let i = 0; i < this.history.length; i++) {
      let pos = this.history[i];
      let col = map(i, 0, this.history.length, 75, 200)
      fill(col);
      let d = map(i, 0, this.history.length, 1, 24);
      ellipse(pos.x, pos.y, d, d);
      // noFill();
      // vertex(pos.x, pos.y);
      // endShape();
    }

    noStroke();
    fill(200);
    ellipse(this.x, this.y, 24, 24);
  }
}

/*
Coding Train
Daniel Shiffman
https://www.youtube.com/thecodingtrain/
https://www.patreon.com/codingtrain

Framework
p5js - A beautiful Javascript library
https://p5js.org/

tutorial
9.7: Drawing Object Trails - p5.js Tutorial
https://youtu.be/vqE8DMfOajk
*/
