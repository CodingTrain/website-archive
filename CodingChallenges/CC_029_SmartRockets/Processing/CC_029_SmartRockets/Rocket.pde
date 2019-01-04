// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/bGz7mv2vD6g
// Processing transcription: Chuck England

final float maxvelocity = 4;

class Rocket {
  PVector pos;
  PVector vel;
  PVector acc;
  DNA dna;
  float fitness = 0;
  boolean hitTarget = false;
  boolean crashed = false;

  Rocket() {
    this(new DNA());
  }

  Rocket(DNA dna_) {
    pos = new PVector(width / 2, height - 20);
    vel = new PVector();
    acc = new PVector(0, -0.01);
    dna = dna_;
    fitness = 0;
    hitTarget = false;
    crashed = false;
  }

  void applyForce(PVector force) {
    acc.add(force);
  }

  void calcFitness() {
    float d = distanceToTarget();
    fitness = map(d, 0, width, width, 0);
    if (hitTarget) {
      fitness *= 10;
    } else if (crashed) {
      fitness /= 10;
    }
  }

  float distanceToTarget() {
    return dist(pos.x, pos.y, target.x, target.y);
  }

  void update() {
    float d = distanceToTarget();
    if (d < 10) {
      hitTarget = true;
      pos = target.copy();
    }

    if (pos.x > barrierx && pos.x < (barrierx + barrierw) && pos.y > barriery && pos.y < (barriery + barrierh)) {
      crashed = true;
    }
    if (pos.x > width || pos.x < 0 || pos.y > height || pos.y < 0) {
      crashed = true;
    }

    applyForce(dna.genes[age]);

    if (!hitTarget && !crashed) {
      vel.add(acc);
      pos.add(vel);
      acc.mult(0);
      vel.limit(maxvelocity);
    }
  }

  void show() {
    pushMatrix();
    noStroke();
    if (hitTarget) {
      fill(50, 205, 50);
    } else if (this.crashed) {
      fill(128, 128, 128);
    } else {
      fill(255, 150);
    }

    translate(pos.x, pos.y);
    rotate(vel.heading());

    // draw rocket body
    rectMode(CENTER);
    rect(0, 0, 25, 5);

    // draw nose cone
    fill(165, 42, 42);
    ellipse(12, 0, 10, 5);

    if (!hitTarget && !crashed) {
      // draw thrust flame
      fill(255, 140 + random(0, 115), random(0, 128));
      beginShape();
      vertex(-14, -3);
      vertex(-35, 0);
      vertex(-14, 3);
      endShape();
    }

    popMatrix();
  }
}
