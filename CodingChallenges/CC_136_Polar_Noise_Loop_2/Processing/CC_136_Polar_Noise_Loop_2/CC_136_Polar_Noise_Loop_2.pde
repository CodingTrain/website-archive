// GIF Loop
// Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/135-gif-loop.html
// https://youtu.be/nBKwCCtWlUg

int totalFrames = 480;
int counter = 0;
boolean record = false;

Particle[] particles = new Particle[100];

void setup() {
  size(600, 600);
  for (int i = 0; i < particles.length; i++) {
    particles[i] = new Particle();
  }
  
  
}

void draw() {
  float percent = 0;
  if (record) {
    percent = float(counter) / totalFrames;
  } else {
    percent = float(counter % totalFrames) / totalFrames;
  }
  render(percent);
  if (record) {
    saveFrame("output/gif-"+nf(counter, 3)+".png");
    if (counter == totalFrames-1) {
      exit();
    }
  }
  counter++;
}

void render(float percent) {
  background(0);
  float a = percent * TWO_PI;
  for (Particle p : particles) {
    p.render(a); 
  }
  
}
