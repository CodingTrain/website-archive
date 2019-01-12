// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Processing transcription: Chuck England

// Steering Evolution
// Another version:
// https://github.com/shiffman/NOC-S17-2-Intelligence-Learning/tree/master/week2-evolution/01_evolve_steering

// Part 1: https://youtu.be/flxOkx0yLrY
// Part 2: https://youtu.be/XaOVH8ZSRNA
// Part 3: https://youtu.be/vZUWTlK7D2Q
// Part 4: https://youtu.be/ykOcaInciBI
// Part 5: https://youtu.be/VnFF5V5DS8s

import java.util.*;

List<Vehicle> vehicles = new ArrayList<Vehicle>();
List<PVector> food = new ArrayList<PVector>();
List<PVector> poison = new ArrayList<PVector>();

boolean debug;

void setup() {
  size(640, 360);
  for (int i = 0; i < 50; i++) {
    float x = random(width);
    float y = random(height);
    vehicles.add(new Vehicle(x, y));
  }

  for (int i = 0; i < 40; i++) {
    float x = random(width);
    float y = random(height);
    food.add(new PVector(x, y));
  }

  for (int i = 0; i < 20; i++) {
    float x = random(width);
    float y = random(height);
    poison.add(new PVector(x, y));
  }
}

void mouseDragged() {
  vehicles.add(new Vehicle(mouseX, mouseY));
}

void draw() {
  background(51);

  if (random(1) < 0.1) {
    float x = random(width);
    float y = random(height);
    food.add(new PVector(x, y));
  }

  if (random(1) < 0.01) {
    float x = random(width);
    float y = random(height);
    poison.add(new PVector(x, y));
  }


  for (int i = 0; i < food.size(); i++) {
    fill(0, 255, 0);
    noStroke();
    ellipse(food.get(i).x, food.get(i).y, 4, 4);
  }

  for (int i = 0; i < poison.size(); i++) {
    fill(255, 0, 0);
    noStroke();
    ellipse(poison.get(i).x, poison.get(i).y, 4, 4);
  }

  for (int i = vehicles.size() - 1; i >= 0; i--) {
    Vehicle v = vehicles.get(i);
    v.boundaries();
    v.behaviors(food, poison);
    v.update();
    v.display();

    Vehicle newVehicle = v.clone();
    if (newVehicle != null) {
      vehicles.add(newVehicle);
    }

    if (v.dead()) {
      food.add(v.position.copy());
      vehicles.remove(i);
    }
  }
}
