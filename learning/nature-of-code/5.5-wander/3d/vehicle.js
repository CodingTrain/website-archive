// Wander (3D)
// The Nature of Code
// The Coding Train / Daniel Shiffman
// https://youtu.be/ujsR2vcJlLk
// https://thecodingtrain.com/learning/nature-of-code/5.5-wander.html

// Main: https://editor.p5js.org/codingtrain/sketches/LVtVlS52Q
// With Sliders: https://editor.p5js.org/codingtrain/sketches/uxemh7FGc
// Deleting Positions: https://editor.p5js.org/codingtrain/sketches/EWHjy--Os
// 3D: https://editor.p5js.org/codingtrain/sketches/t6sFXmVrk
// Displacement: https://editor.p5js.org/codingtrain/sketches/VdHUvgHkm
// Perlin Noise: https://editor.p5js.org/codingtrain/sketches/XH2DtikuI

class Vehicle {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = createVector(1, 0);
    this.acc = createVector(0, 0);
    this.maxSpeed = 4;
    this.maxForce = 0.2;
    this.r = 16;

    this.lat = PI / 2;
    this.lon = TWO_PI;

    this.currentPath = [];
    this.paths = [this.currentPath];
  }

  wander() {
    let wanderPoint = this.vel.copy();
    wanderPoint.setMag(200);
    wanderPoint.add(this.pos);
    fill(255, 0, 0);
    noStroke();
    push();
    translate(wanderPoint.x, wanderPoint.y, wanderPoint.z);
    sphere(8);

    let wanderRadius = 50;
    fill(255, 150);
    stroke(255, 200);
    sphere(wanderRadius);
    pop();
    line(
      this.pos.x,
      this.pos.y,
      this.pos.z,
      wanderPoint.x,
      wanderPoint.y,
      wanderPoint.z
    );

    const x = wanderRadius * sin(this.lat) * cos(this.lon);
    const y = wanderRadius * sin(this.lat) * sin(this.lon);
    const z = wanderRadius * cos(this.lat);

    wanderPoint.add(x, y, z);
    fill(0, 255, 0);
    noStroke();
    push();
    translate(wanderPoint.x, wanderPoint.y, wanderPoint.z);
    sphere(16);
    pop();

    stroke(255);
    noFill();
    line(
      this.pos.x,
      this.pos.y,
      this.pos.z,
      wanderPoint.x,
      wanderPoint.y,
      wanderPoint.z
    );

    let steer = wanderPoint.sub(this.pos);
    steer.setMag(this.maxForce);
    this.applyForce(steer);

    let displaceRange = 0.2;
    this.lat += random(-displaceRange, displaceRange);
    this.lon += random(-displaceRange, displaceRange);
  }

  evade(vehicle) {
    let pursuit = this.pursue(vehicle);
    pursuit.mult(-1);
    return pursuit;
  }

  pursue(vehicle) {
    let target = vehicle.pos.copy();
    let prediction = vehicle.vel.copy();
    prediction.mult(10);
    target.add(prediction);
    fill(0, 255, 0);
    circle(target.x, target.y, 16);
    return this.seek(target);
  }

  arrive(target) {
    // 2nd argument true enables the arrival behavior
    return this.seek(target, true);
  }

  flee(target) {
    return this.seek(target).mult(-1);
  }

  seek(target, arrival = false) {
    let force = p5.Vector.sub(target, this.pos);
    let desiredSpeed = this.maxSpeed;
    if (arrival) {
      let slowRadius = 100;
      let distance = force.mag();
      if (distance < slowRadius) {
        desiredSpeed = map(distance, 0, slowRadius, 0, this.maxSpeed);
      }
    }
    force.setMag(desiredSpeed);
    force.sub(this.vel);
    force.limit(this.maxForce);
    return force;
  }

  applyForce(force) {
    this.acc.add(force);
  }

  update() {
    this.vel.add(this.acc);
    this.vel.limit(this.maxSpeed);
    this.pos.add(this.vel);
    this.acc.set(0, 0);

    this.currentPath.push(this.pos.copy());

    // Count positions
    let total = 0;
    for (let path of this.paths) {
      total += path.length;
    }

    if (total > 150) {
      this.paths[0].shift();
      if (this.paths[0].length === 0) {
        this.paths.shift();
      }
    }

    this.pos.z = constrain(this.pos.z, -100, 100);
  }

  show() {
    stroke(255);
    strokeWeight(1);
    noStroke();
    fill(255);
    push();
    translate(this.pos.x, this.pos.y, this.pos.z);
    // rotate(this.vel.heading());
    // triangle(-this.r, -this.r / 2, -this.r, this.r / 2, this.r, 0);
    sphere(this.r);
    pop();

    stroke(255);
    strokeWeight(2);
    for (let path of this.paths) {
      beginShape();
      noFill();
      for (let v of path) {
        vertex(v.x, v.y, v.z);
      }
      endShape();
    }
  }

  edges() {
    let hitEdge = false;

    let right = width / 2 + this.r;
    let left = -width / 2 - this.r;
    let top = -height / 2 - this.r;
    let bottom = height / 2 + this.r;

    if (this.pos.x > right) {
      this.pos.x = left;
      hitEdge = true;
    } else if (this.pos.x < left) {
      this.pos.x = right;
      hitEdge = true;
    }
    if (this.pos.y < top) {
      this.pos.y = bottom;
      hitEdge = true;
    } else if (this.pos.y > bottom) {
      this.pos.y = top;
      hitEdge = true;
    }

    if (hitEdge) {
      this.currentPath = [];
      this.paths.push(this.currentPath);
    }
  }
}

class Target extends Vehicle {
  constructor(x, y) {
    super(x, y);
    this.vel = p5.Vector.random2D();
    this.vel.mult(5);
  }

  show() {
    stroke(255);
    strokeWeight(2);
    fill("#F063A4");
    push();
    translate(this.pos.x, this.pos.y);
    circle(0, 0, this.r * 2);
    pop();
  }
}
