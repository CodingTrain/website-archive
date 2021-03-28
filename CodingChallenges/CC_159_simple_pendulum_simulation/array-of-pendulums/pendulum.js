// Simple Pendulum Simulation Array
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/159-simple-pendulum-simulation.html
// https://youtu.be/NBWMtlbbOag

class Pendulum {
  constructor(x, y, r, bobR) {
    // Fill all variables
    this.origin = createVector(x, y);
    this.position = createVector();
    this.r = r;
    this.angle = PI / 2;

    this.aVelocity = 0.0;
    this.aAcceleration = 0.0;
    this.damping = 0.999; // Arbitrary damping
    this.ballr = bobR; // Arbitrary ball radius
  }

  // Function to update position
  update() {
    this.aAcceleration = ((-1 * gravity) / this.r) * sin(this.angle); // Calculate acceleration (see: http://www.myphysicslab.com/pendulum1.html)
    this.aVelocity += this.aAcceleration; // Increment velocity
    this.aVelocity *= this.damping; // Arbitrary damping
    this.angle += this.aVelocity; // Increment angle
  }

  show() {
    this.position.set(this.r * sin(this.angle), this.r * cos(this.angle), 0); // Polar to cartesian conversion
    this.position.add(this.origin); // Make sure the position is relative to the pendulum's origin

    stroke(252, 238, 33);
    strokeWeight(1);
    // Draw the arm
    line(this.origin.x, this.origin.y, this.position.x, this.position.y);
    ellipseMode(CENTER);
    //fill(252, 238, 33, 200);
    // Draw the ball
    //ellipse(this.position.x, this.position.y, this.ballr*4);
  }
}
