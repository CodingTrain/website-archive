Planet sun;

void setup() {
  size(600, 600, P3D);
  sun = new Planet(50, 0, 0);
  sun.spawnMoons(1, 1);
}

void draw() {
  background(0);
  lights();
  translate(width/2, height/2);
  sun.show(); 
  sun.orbit();
}