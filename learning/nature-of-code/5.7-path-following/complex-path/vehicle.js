// Path Following (Complex Path)
// The Nature of Code
// The Coding Train / Daniel Shiffman
// https://youtu.be/LrnR6dc2IfM
// https://thecodingtrain.com/learning/nature-of-code/5.7-path-following.html

// Path Following: https://editor.p5js.org/codingtrain/sketches/dqM054vBV
// Complex Path: https://editor.p5js.org/codingtrain/sketches/2FFzvxwVt

// Path Following
// Vehicle class

class Vehicle {
  // Constructor initialize all values
  constructor(x, y, ms, mf) {
    this.position = createVector(x, y);
    this.r = 12;
    this.maxspeed = ms;
    this.maxforce = mf;
    this.acceleration = createVector(0, 0);
    this.velocity = createVector(this.maxspeed, 0);
  }

  // A function to deal with path following and separation
  applyBehaviors(vehicles, path) {
    // Follow path force
    let f = this.follow(path);
    // Separate from other boids force
    let s = this.separate(vehicles);
    // Arbitrary weighting
    f.mult(3);
    s.mult(1);
    // Accumulate in acceleration
    this.applyForce(f);
    this.applyForce(s);
  }

  applyForce(force) {
    // We could add mass here if we want A = F / M
    this.acceleration.add(force);
  }

  // Main "run" function
  run() {
    this.update();
    this.render();
  }

  // This function implements Craig Reynolds' path following algorithm
  // http://www.red3d.com/cwr/steer/PathFollow.html
  follow(path) {
    // Predict position 25 (arbitrary choice) frames ahead
    let predict = this.velocity.copy();
    predict.normalize();
    predict.mult(25);
    let predictpos = p5.Vector.add(this.position, predict);

    // Now we must find the normal to the path from the predicted position
    // We look at the normal for each line segment and pick out the closest one
    let normal = null;
    let target = null;
    let worldRecord = 1000000; // Start with a very high worldRecord distance that can easily be beaten

    // Loop through all points of the path
    for (let i = 0; i < path.points.length; i++) {
      // Look at a line segment
      let a = path.points[i];
      let b = path.points[(i + 1) % path.points.length]; // Note Path has to wraparound

      // Get the normal point to that line
      let normalPoint = getNormalPoint(predictpos, a, b);

      // Check if normal is on line segment
      let dir = p5.Vector.sub(b, a);
      // If it's not within the line segment, consider the normal to just be the end of the line segment (point b)
      //if (da + db > line.mag()+1) {
      if (
        normalPoint.x < min(a.x, b.x) ||
        normalPoint.x > max(a.x, b.x) ||
        normalPoint.y < min(a.y, b.y) ||
        normalPoint.y > max(a.y, b.y)
      ) {
        normalPoint = b.copy();
        // If we're at the end we really want the next line segment for looking ahead
        a = path.points[(i + 1) % path.points.length];
        b = path.points[(i + 2) % path.points.length]; // Path wraps around
        dir = p5.Vector.sub(b, a);
      }

      // How far away are we from the path?
      let d = p5.Vector.dist(predictpos, normalPoint);
      // Did we beat the worldRecord and find the closest line segment?
      if (d < worldRecord) {
        worldRecord = d;
        normal = normalPoint;

        // Look at the direction of the line segment so we can seek a little bit ahead of the normal
        dir.normalize();
        // This is an oversimplification
        // Should be based on distance to path & velocity
        dir.mult(25);
        target = normal.copy();
        target.add(dir);
      }
    }

    // Draw the debugging stuff
    if (debug) {
      // Draw predicted future position
      stroke(0);
      fill(0);
      line(this.position.x, this.position.y, predictpos.x, predictpos.y);
      ellipse(predictpos.x, predictpos.y, 4, 4);

      // Draw normal position
      stroke(0);
      fill(0);
      ellipse(normal.x, normal.y, 4, 4);
      // Draw actual target (red if steering towards it)
      line(predictpos.x, predictpos.y, target.x, target.y);
      if (worldRecord > path.radius) fill(255, 0, 0);
      noStroke();
      ellipse(target.x, target.y, 8, 8);
    }

    // Only if the distance is greater than the path's radius do we bother to steer
    if (worldRecord > path.radius) {
      return this.seek(target);
    } else {
      return createVector(0, 0);
    }
  }

  // Separation
  // Method checks for nearby boids and steers away
  separate(boids) {
    let desiredseparation = this.r * 2;
    let steer = createVector(0, 0, 0);
    let count = 0;
    // For every boid in the system, check if it's too close
    for (let i = 0; i < boids.length; i++) {
      let other = boids[i];
      let d = p5.Vector.dist(this.position, other.position);
      // If the distance is greater than 0 and less than an arbitrary amount (0 when you are yourself)
      if (d > 0 && d < desiredseparation) {
        // Calculate vector pointing away from neighbor
        let diff = p5.Vector.sub(this.position, other.position);
        diff.normalize();
        diff.div(d); // Weight by distance
        steer.add(diff);
        count++; // Keep track of how many
      }
    }
    // Average -- divide by how many
    if (count > 0) {
      steer.div(count);
    }

    // As long as the vector is greater than 0
    if (steer.mag() > 0) {
      // Implement Reynolds: Steering = Desired - Velocity
      steer.normalize();
      steer.mult(this.maxspeed);
      steer.sub(this.velocity);
      steer.limit(this.maxforce);
    }
    return steer;
  }

  // Method to update position
  update() {
    // Update velocity
    this.velocity.add(this.acceleration);
    // Limit speed
    this.velocity.limit(this.maxspeed);
    this.position.add(this.velocity);
    // Reset accelertion to 0 each cycle
    this.acceleration.mult(0);
  }

  // A method that calculates and applies a steering force towards a target
  // STEER = DESIRED MINUS VELOCITY
  seek(target) {
    let desired = p5.Vector.sub(target, this.position); // A vector pointing from the position to the target

    // Normalize desired and scale to maximum speed
    desired.normalize();
    desired.mult(this.maxspeed);
    // Steering = Desired minus Vepositionity
    let steer = p5.Vector.sub(desired, this.velocity);
    steer.limit(this.maxforce); // Limit to maximum steering force

    return steer;
  }

  render() {
    // Simpler boid is just a circle
    fill(75);
    stroke(0);
    push();
    translate(this.position.x, this.position.y);
    ellipse(0, 0, this.r, this.r);
    pop();
  }
}

// A function to get the normal point from a point (p) to a line segment (a-b)
// This function could be optimized to make fewer new Vector objects
function getNormalPoint(p, a, b) {
  // Vector from a to p
  let ap = p5.Vector.sub(p, a);
  // Vector from a to b
  let ab = p5.Vector.sub(b, a);
  ab.normalize(); // Normalize the line
  // Project vector "diff" onto line by using the dot product
  ab.mult(ap.dot(ab));
  let normalPoint = p5.Vector.add(a, ab);
  return normalPoint;
}
