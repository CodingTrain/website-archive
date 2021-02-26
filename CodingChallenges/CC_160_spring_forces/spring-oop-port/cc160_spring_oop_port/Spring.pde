// Spring Forces (Spring OOP Port)
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/160-spring-forces.html
// https://youtu.be/Rr-5HiXquhw

// Simple Spring: https://editor.p5js.org/codingtrain/sketches/dcd6-2mWa
// Spring Vector: https://editor.p5js.org/codingtrain/sketches/_A2pm_SSg
// Spring OOP: https://editor.p5js.org/codingtrain/sketches/9BAoEn4Po
// Soft Spring: https://editor.p5js.org/codingtrain/sketches/S5dY7qjxP

class Spring {
  
  float k;
  float restLength;
  Particle a, b;
  
  Spring(float k, float restLength, Particle a, Particle b) {
    this.k = k;
    this.restLength = restLength;
    this.a = a;
    this.b = b;
  }

  void update() {
    PVector force = PVector.sub(b.position, a.position);
    float x = force.mag() - this.restLength;
    force.normalize();
    force.mult(k * x);
    a.applyForce(force);
    force.mult(-1);
    b.applyForce(force);
  }

  void show() {
    strokeWeight(4);
    stroke(255);
    line(
      a.position.x,
      a.position.y,
      b.position.x,
      b.position.y
    );
  }
}
