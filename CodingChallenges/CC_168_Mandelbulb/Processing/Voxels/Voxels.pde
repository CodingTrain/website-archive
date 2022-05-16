
int DIM = 16;
float angle = -PI/3;
void setup() {
  size(600, 400, P3D);
}
void draw() {
  background(0);
  translate(width/2, height/2, 100);
  lights();
  rotateY(angle);
  angle+=0.02;
  float range = 100;
  for (int i = 0; i < DIM; i++) {
    for (int j = 0; j < DIM; j++) {
      for (int k = 0; k < DIM; k++) {
        float x = map(i, 0, DIM, -range, range);
        float y = map(j, 0, DIM, -range, range);
        float z = map(k, 0, DIM, -range, range);
        if (y > x && y > z) {
          pushMatrix();
          translate(x, y, z);
          stroke(255);
          fill(51);
          box(2*range/DIM);
          popMatrix();
        }
      }
    }
  }
}
