import peasy.*;

int DIM = 128;
PeasyCam cam;
ArrayList<PVector> mandelbulb = new ArrayList<PVector>();

void setup() {
  size(600, 600, P3D);
  cam = new PeasyCam(this, 600);

  StringList points = new StringList();

  for (int i = 0; i < DIM; i++) {
    for (int j = 0; j < DIM; j++) {
      boolean edge = false;
      for (int k = 0; k < DIM; k++) {
        float x = map(i, 0, DIM, -1, 1);
        float y = map(j, 0, DIM, -1, 1);
        float z = map(k, 0, DIM, -1, 1);
        PVector zeta = new PVector(0, 0, 0);
        int n = 8;
        int maxiterations = 20;
        int iteration = 0;
        while (true) {
          Spherical c = spherical(zeta.x, zeta.y, zeta.z);
          float newx = pow(c.r, n) * sin(c.theta*n) * cos(c.phi*n);
          float newy = pow(c.r, n) * sin(c.theta*n) * sin(c.phi*n);
          float newz = pow(c.r, n) * cos(c.theta*n);
          zeta.x = newx + x;
          zeta.y = newy + y;
          zeta.z = newz + z;
          iteration++;
          if (c.r > 2) {
            if (edge) {
              edge = false;
            }
            break;
          }
          if (iteration > maxiterations) {
            if (!edge) {
              edge = true;
              mandelbulb.add(new PVector(x, y, z));
            }
            break;
          }
        }
      }
    }
  }
  
  String[] output = new String[mandelbulb.size()];
  for (int i = 0; i < output.length; i++) {
    PVector v = mandelbulb.get(i);
    output[i] = v.x + " " + v.y + " " + v.z;
  }
  saveStrings("mandelbulb.txt", output);
  
}

class Spherical {
  float r, theta, phi;
  Spherical(float r, float theta, float phi) {
    this.r = r;
    this.theta = theta;
    this.phi = phi;
  }
}

Spherical spherical(float x, float y, float z) {
  float r = sqrt(x*x + y*y + z*z);
  float theta = atan2( sqrt(x*x+y*y), z);
  float phi = atan2(y, x);
  return new Spherical(r, theta, phi);
}

void draw() {
  background(0);
  rotateX(PI/4);
  rotateY(-PI/3);
  for (PVector v : mandelbulb) {
    stroke(255);
    strokeWeight(1);
    point(v.x*200, v.y*200, v.z*200);
  }
}
