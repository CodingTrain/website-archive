// Daniel Shiffman
// http://codingtra.in
// Attraction / Repulsion
// Video: https://youtu.be/OAcXnzRNiCY
// Processing transcription: Chuck England

import java.util.*;

List<PVector> attractors = new ArrayList<PVector>();
List<Particle> particles = new ArrayList<Particle>();

void setup() {
  size(400, 400);

  // for (int i = 0; i < 10; i++) {
  //   attractors.push(createVector(random(width), random(height)));
  // }
}

void mousePressed() {
  attractors.add(new PVector(mouseX, mouseY));
}

void draw() {
  background(51);
  stroke(255);
  strokeWeight(4);
  particles.add(new Particle(random(width), random(height)));

  if (particles.size() > 100) {
    particles.remove(0);
  }

  for (int i = 0; i < attractors.size(); i++) {
    stroke(0, 255, 0);
    point(attractors.get(i).x, attractors.get(i).y);
  }
  for (int i = 0; i < particles.size(); i++) {
    Particle particle = particles.get(i);
    for (int j = 0; j < attractors.size(); j++) {
      particle.attracted(attractors.get(j));
    }
    particle.update();
    particle.show();
  }
}
