class Particle{
  
  PVector pos = new PVector(random(width), random(height));
  PVector vel = new PVector(0, 0);
  PVector acc = new PVector(0, 0);
  int maxspeed = 4;
  int h = 0;
  int scl, cols;

  PVector prevPos = pos.copy();
  
  
  Particle(int _cols, int _scl) {
    cols = _cols;
    scl = _scl;
  }

  void update() {
    vel.add(acc);
    vel.limit(maxspeed);
    pos.add(vel);
    acc.mult(0);
  }
  
  void follow(PVector[] vectors) {
    int x = floor((float) pos.x / (float) scl);
    int y = floor((float)pos.y / (float) scl);
    int index = x + y * cols;
    PVector force = vectors[index];
    applyForce(force);
  }

  void applyForce(PVector force) {
    acc.add(force);
  }

  void show() {
    stroke(h, 255, 255, 25);
    h = h + 1;
    if (h > 255) {
      h = 0;
    }
    strokeWeight(1);
    line(pos.x, pos.y, prevPos.x, prevPos.y);
    updatePrev();
  }

  void updatePrev() {
    prevPos.x = pos.x;
    prevPos.y = pos.y;
  }

  void edges() {
    if (pos.x > width) {
      pos.x = 0;
      updatePrev();
    }
    if (pos.x < 0) {
      pos.x = width-1;
      updatePrev();
    }
    if (pos.y > height) {
      pos.y = 0;
      updatePrev();
    }
    if (pos.y < 0) {
      pos.y = height-1;
      updatePrev();
    }
  }
}

float inc = 0.1;
int scl = 10;
int cols, rows;

float zoff = 0;
int particle_num = 300;
Particle[] particles;
PVector[] flowfield;


void setup(){
  size(1920,1080);
  colorMode(HSB, 255);
  background(51);
  
  cols = floor(width / scl);
  rows = floor(height / scl);
  flowfield = new PVector[cols*rows];
  particles = new Particle[particle_num];
  for (int i = 0; i < particle_num; i++) {
    particles[i] = new Particle(cols, scl);
  }
}

void draw(){
  float yoff = 0;
  for (int y = 0; y < rows; y++) {
    float xoff = 0;
    for (int x = 0; x < cols; x++) {
      int index = x + y * cols;
      float angle = noise(xoff, yoff, zoff) * TWO_PI * 4;
      PVector v = PVector.fromAngle(angle);
      v.setMag(1);
      flowfield[index] = v;
      xoff += inc;
      stroke(0, 50);
    }
    yoff += inc;

    zoff += 0.0003;
  }

  for (int i = 0; i < particles.length; i++) {
    particles[i].follow(flowfield);
    particles[i].update();
    particles[i].edges();
    particles[i].show();
  }
}
