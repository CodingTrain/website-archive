

void setup() {
  size(256, 256);
}

float sphereSDF(PVector v, float r) {
  return v.mag()-r;
}

PVector abs(PVector v) {
  return new PVector(abs(v.x), abs(v.y), abs(v.z));
}

PVector max(PVector v1, PVector v2) {
  return new PVector(max(v1.x, v2.x), max(v1.y, v2.y), max(v1.z, v2.z));
}

float boxSDF(PVector b, PVector r ) {
  PVector d = abs(b);
  d.sub(r);
  float m = max(d, new PVector(0, 0, 0)).mag();
  return m + min(max(d.x, max(d.y, d.z)), 0.0);
}


void rotateY(PVector v, float angle) {
  float x = v.x * cos(angle) + v.z * sin(angle);
  float y = v.y;
  float z = -v.x * sin(angle) + v.z * cos(angle);
  v.set(x, y, z);
}

void rotateX(PVector v, float angle) {
  float x = v.x;//
  float y = v.y * cos(angle) - v.z * sin(angle);
  float z = v.y * sin(angle) + v.z * cos(angle);
  v.set(x, y, z);
}


float time = 0;

PVector mod(PVector v1, float y) {
  PVector v = new PVector();
  v.x = v1.x - y * floor(v1.x / y);
  v.y = v1.y - y * floor(v1.y / y);
  v.z = v1.z - y * floor(v1.z / y);
  return v;
}

// Inspired by
// https://observablehq.com/@leon196/raymarch
float wackySDF(PVector pos) {
  float dist = 100;
  pos.z += time;
  pos.x -= time;
  float grid = 3+sin(time)*2;
  pos = mod(pos, grid);
  pos.sub(grid*0.5, grid*0.5, grid*0.5);
  dist = pos.mag() - 1.0;
  return dist;
}


void draw() {
  time=1+sin(frameCount*0.01);
  background(0);
  loadPixels();
  for (int i = 0; i < width; i++) {
    for (int j = 0; j < height; j++) {
      float x = map(i, 0, width, -1, 1);
      float y = map(j, 0, height, -1, 1);
      PVector ray = new PVector(x, y, 1).normalize();
      // rotateY(ray, PI/4);
      // rotateX(ray, PI/4);
      PVector pos = new PVector(0, 0, -10);

      // Ray Marching!
      // https://observablehq.com/@leon196/raymarch
      float count = 20;
      float shade = 0;
      for (float n = count; n > 0; --n) {
        // float dist = wackySDF(pos);
        // float dist = sphereSDF(pos, 5);
        float dist = boxSDF(pos, new PVector(2, 2, 2));
        if (dist < .001) {
          shade = n / count;
          break;
        }
        pos.add(PVector.mult(ray, dist));
      }
      color c = color(shade*255);
      pixels[i+j*width] = c;
    }
  }
  updatePixels();
}
