// Spring Forces (Soft Spring Port)
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/160-spring-forces.html
// https://youtu.be/Rr-5HiXquhw

// Simple Spring: https://editor.p5js.org/codingtrain/sketches/dcd6-2mWa
// Spring Vector: https://editor.p5js.org/codingtrain/sketches/_A2pm_SSg
// Spring OOP: https://editor.p5js.org/codingtrain/sketches/9BAoEn4Po
// Soft Spring: https://editor.p5js.org/codingtrain/sketches/S5dY7qjxP

ArrayList<Particle> particles = new ArrayList<Particle>();
ArrayList<Spring> springs = new ArrayList<Spring>();
int spacing = 50;
float k = 0.1;

PVector gravity;

void setup() {
  size(800, 800);
  for (int i = 0; i < 10; i++) {
    particles.add(new Particle(width / 2, i * spacing));
    if (i != 0) {
      Particle a = particles.get(i);
      Particle b = particles.get(i - 1);
      Spring spring = new Spring(k, spacing, a, b);
      springs.add(spring);
    }
  }

  particles.get(0).locked = true;

  gravity = new PVector(0, 0.1);
}

void draw() {
  background(112, 50, 126);

  for (Spring s : springs) {
    s.update();
    //s.show();
  }

  noFill();
  stroke(252, 238, 33);
  strokeWeight(8);
  beginShape();
  Particle head = particles.get(0);
  curveVertex(head.position.x, head.position.y);
  for (Particle p : particles) {
    p.applyForce(gravity);
    p.update();
    curveVertex(p.position.x, p.position.y);
    //p.show();
  }
  Particle tail = particles.get(particles.size() - 1);
  curveVertex(tail.position.x, tail.position.y);
  endShape();

  fill(45, 197, 244);
  circle(tail.position.x, tail.position.y, 64);

  if (mousePressed) {
    tail.position.set(mouseX, mouseY);
    tail.velocity.set(0, 0);
  }
}
