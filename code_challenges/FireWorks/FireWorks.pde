ArrayList<Firework> fireworks;

PVector gravity = new PVector(0, 0.2);

void setup() {
  size(640, 360, P2D);
  fireworks = new ArrayList<Firework>();
}

void draw() {
  if (random(1) < 0.05) {
    fireworks.add(new Firework());
  }
  background(255);

  
  for (int i = fireworks.size()-1; i >= 0; i--) {
    Firework f = fireworks.get(i);
    f.run();
    if (f.done()) {
      fireworks.remove(i);
    }
  }
  
  
  
}