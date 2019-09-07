// Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/145-2d-ray-casting.html
// https://youtu.be/TOEi6T2mtHo

// 2D Ray Casting
// https://editor.p5js.org/codingtrain/sketches/Nqsq3DFv-

Boundary[] walls;
Ray ray;
Particle particle;
float xoff = 0;
float yoff = 10000;

void setup() {
  size(400, 400);
  walls = new Boundary[5+4];
  for (int i = 0; i < walls.length; i++) {
    float x1 = random(width);
    float x2 = random(width);
    float y1 = random(height);
    float y2 = random(height);
    walls[i] = new Boundary(x1, y1, x2, y2);
  }
  walls[walls.length-4] = (new Boundary(0, 0, width, 0));
  walls[walls.length-3] = (new Boundary(width, 0, width, height));
  walls[walls.length-2] = (new Boundary(width, height, 0, height));
  walls[walls.length-1] = (new Boundary(0, height, 0, 0));
  particle = new Particle();
}

void draw() {
  background(0);
  for (Boundary wall : walls) {
    wall.show();
  }
  particle.update(noise(xoff) * width, noise(yoff) * height);
  particle.show();
  particle.look(walls);

  xoff += 0.01;
  yoff += 0.01;
}
