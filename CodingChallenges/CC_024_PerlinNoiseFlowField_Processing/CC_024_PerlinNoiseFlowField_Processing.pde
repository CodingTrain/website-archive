float inc = 0.1;
int scl = 10;
int cols, rows, counter;

float zoff = 0;
int particle_num = 300;
Particle[] particles;
PVector[] flowfield;


void setup(){
  size(800,800);
  colorMode(HSB, 255);
  //fullScreen();
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

void mouseClicked(){
  save("Perlin" + counter + ".png");
  counter ++;
}
