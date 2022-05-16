// Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/146-rendering-ray-casting.html
// https://youtu.be/vYgIKn7iDH8

// Rendering Ray Casting
// https://editor.p5js.org/codingtrain/sketches/yEzlR0_zq

import java.util.ArrayList;

ArrayList<Boundary> walls;
Particle particle;
float xoff = 0;
float yoff = 10000;

float sceneW = 400;
float sceneH = 400;

void setup() {
  size(800, 400);
  walls = new ArrayList<>();
  for (int i = 0; i < 5; i++) {
    float x1 = random(sceneW);
    float x2 = random(sceneW);
    float y1 = random(sceneH);
    float y2 = random(sceneH);
    walls.add(new Boundary(x1, y1, x2, y2));
  }
  walls.add(new Boundary(0, 0, sceneW, 0));
  walls.add(new Boundary(sceneW, 0, sceneW, sceneH));
  walls.add(new Boundary(sceneW, sceneH, 0, sceneH));
  walls.add(new Boundary(0, sceneH, 0, 0));
  particle = new Particle();
}

void draw() {
  // Updating FOV relative to mouseX since Processing has no support for sliders
  float FOVvalue = 45;
  if (mouseX <= 2) {
    FOVvalue = 2;
  } else if (mouseX >= width / 2) {
    FOVvalue = 360;
  } else {
    FOVvalue = map(mouseX, 0, width / 2, 0, 360);
  }
  particle.updateFOV(FOVvalue);
  
  if (keyPressed && key == CODED) {
    if (keyCode == LEFT) {
      particle.rotate(-0.1);
    } else if (keyCode == RIGHT) {
      particle.rotate(0.1);
    } else if (keyCode == UP) {
      particle.move(2);
    } else if (keyCode == DOWN) {
      particle.move(-2);
    }
  }

  background(0);
  for (Boundary wall : walls) {
    wall.show();
  }
  particle.show();

  ArrayList<Float> scene = particle.look(walls);
  float w = sceneW / scene.size();

  push();
  translate(sceneW, 0);
  for (int i = 0; i < scene.size(); i++) {
    noStroke();
    float sq = scene.get(i) * scene.get(i);
    float wSq = sceneW * sceneW;
    float b = map(sq, 0, wSq, 255, 0);
    float h = map(scene.get(i), 0, sceneW, sceneH, 0);
    fill(b);
    rectMode(CENTER);
    rect(i * w + w / 2, sceneH / 2, w + 1, h);
  }
  pop();
}
