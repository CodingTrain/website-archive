// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Video: https://youtu.be/10st01Z0jxc

ArrayList<Tentacle> tentacles;

PVector pos;
PVector vel;
PVector gravity;

void setup() {
  size(800, 600);
  pos = new PVector(0, 0);
  vel = new PVector(2, 1.3);
  gravity = new PVector(0, 0.1);
  vel.mult(3);

  tentacles = new ArrayList<Tentacle>();

  float da = TWO_PI/2;
  for (float a = 0; a < TWO_PI; a += da) {
    float x = width/2 + cos(a) * 300;
    float y = height/2 + sin(a) * 300;
    tentacles.add(new Tentacle(x, y));
  }
}

void draw() {
  background(51);
  noFill();
  ellipse(width/2, height/2, 400, 400);
  for (Tentacle t : tentacles) {
    t.update();
    t.show();
  }

  pos.add(vel);
  vel.add(gravity);
  noStroke();
  fill(100, 255, 0);
  ellipse(pos.x, pos.y, 32, 32);

  if (pos.x > width || pos.x < 0) {
    vel.x *= -1;
  }

  if (pos.y > height) {
    pos.y = height;
    vel.y *= -1;
    vel.mult(0.95);
  }
}
