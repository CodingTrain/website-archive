import peasy.*;

PImage dot;

int DIM = 64;
PeasyCam cam;
ArrayList<MandelPoint> mandelbulb = new ArrayList<MandelPoint>();
int maxiterations = 20;

class MandelPoint {
  PVector v;
  float i;

  MandelPoint(PVector v, float i) {
    this.v = v;
    this.i = i;
  }
}

void setup() {
  size(600, 600, P3D);
  cam = new PeasyCam(this, 600);
  dot = loadImage("dot.png");

  StringList points = new StringList();
  
  for (int i = 0; i < DIM; i++) {
    for (int j = 0; j < DIM; j++) {

      boolean edge = false;
      int lastIteration = 0;
      for (int k = 0; k < DIM; k++) {
        float x = map(i, 0, DIM, -1, 1);
        float y = map(j, 0, DIM, -1, 1);
        float z = map(k, 0, DIM, -1, 1);

        PVector zeta = new PVector(0, 0, 0);
        int n = 8;
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
            lastIteration = iteration;
            if (edge) {
              edge = false;
            }
            break;
          }
          if (iteration > maxiterations) {
            if (!edge) {
              edge = true;
              mandelbulb.add(new MandelPoint(new PVector(x*200, y*200, z*200), lastIteration));
              points.append(x + " " + y + " " + z);
            }
            break;
          }
        }
      }
    }
  }
  String[] output = points.array();
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
  lights();
  ambientLight(255,100, 200);
  rotateX(PI/4);
  rotateY(-PI/3);
  colorMode(HSB, 255);
  for (MandelPoint m : mandelbulb) {
    push();
    translate(m.v.x, m.v.y, m.v.z);
    imageMode(CENTER);
    image(dot,0,0,400/(DIM),400/(DIM));
    //box(400/(DIM));
    pop();
  }
}
