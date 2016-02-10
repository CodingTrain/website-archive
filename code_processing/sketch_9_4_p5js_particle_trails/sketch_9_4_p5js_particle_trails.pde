// Daniel Shiffman
// code for https://youtu.be/vqE8DMfOajk

ArrayList<Particle> particles = new ArrayList<Particle>();

void setup() {
  size(600, 600);
}

void mousePressed() {
  particles.add(new Particle(mouseX, mouseY));
}

void draw() {
  background(200);
  for (Particle p : particles) {
    p.update();
    p.show();
  }
  
}