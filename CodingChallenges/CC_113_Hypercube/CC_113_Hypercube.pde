// Daniel Shiffman
// http://youtube.com/thecodingtrain
// http://codingtra.in

// Coding Challenge #113: 4D Hypercube
// https://youtu.be/XE3YDVdQSPo

// Matrix Multiplication
// https://youtu.be/tzsgS19RRc8

float angle = 0;

P4Vector[] points = new P4Vector[16];

void setup() {
  fullScreen(P3D);
  points[0] = new P4Vector(-1, -1, -1, 1);
  points[1] = new P4Vector(1, -1, -1, 1);
  points[2] = new P4Vector(1, 1, -1, 1);
  points[3] = new P4Vector(-1, 1, -1, 1);
  points[4] = new P4Vector(-1, -1, 1, 1);
  points[5] = new P4Vector(1, -1, 1, 1);
  points[6] = new P4Vector(1, 1, 1, 1);
  points[7] = new P4Vector(-1, 1, 1, 1);
  points[8] = new P4Vector(-1, -1, -1, -1);
  points[9] = new P4Vector(1, -1, -1, -1);
  points[10] = new P4Vector(1, 1, -1, -1);
  points[11] = new P4Vector(-1, 1, -1, -1);
  points[12] = new P4Vector(-1, -1, 1, -1);
  points[13] = new P4Vector(1, -1, 1, -1);
  points[14] = new P4Vector(1, 1, 1, -1);
  points[15] = new P4Vector(-1, 1, 1, -1);
}

void draw() {
  background(0);
  translate(width/2, height/2);
  rotateX(-PI/2);
  PVector[] projected3d = new PVector[16];

  for (int i = 0; i < points.length; i++) {
    P4Vector v = points[i];

    float[][] rotationXY = {
      {cos(angle), -sin(angle), 0, 0},
      {sin(angle), cos(angle), 0, 0},
      {0, 0, 1, 0},
      {0, 0, 0, 1}
    };

    float[][] rotationZW = {
      {1, 0, 0, 0},
      {0, 1, 0, 0},
      {0, 0, cos(angle), -sin(angle)},
      {0, 0, sin(angle), cos(angle)}
    };


    P4Vector rotated = matmul(rotationXY, v, true);
    rotated = matmul(rotationZW, rotated, true);

    float distance = 2;
    float w = 1 / (distance - rotated.w);

    float[][] projection = {
      {w, 0, 0, 0},
      {0, w, 0, 0},
      {0, 0, w, 0}
    };

    PVector projected = matmul(projection, rotated);
    projected.mult(width/8);
    projected3d[i] = projected;

    stroke(255, 200);
    strokeWeight(32);
    noFill();

    point(projected.x, projected.y, projected.z);
  }

  // Connecting
  for (int i = 0; i < 4; i++) {
    connect(0, i, (i+1) % 4, projected3d );
    connect(0, i+4, ((i+1) % 4)+4, projected3d);
    connect(0, i, i+4, projected3d);
  }

  for (int i = 0; i < 4; i++) {
    connect(8, i, (i+1) % 4, projected3d );
    connect(8, i+4, ((i+1) % 4)+4, projected3d);
    connect(8, i, i+4, projected3d);
  }

  for (int i = 0; i < 8; i++) {
    connect(0, i, i + 8, projected3d);
  }

  //angle = map(mouseX, 0, width, 0, TWO_PI);
  angle += 0.02;
}

void connect(int offset, int i, int j, PVector[] points) {
  PVector a = points[i+offset];
  PVector b = points[j+offset];
  strokeWeight(4);
  stroke(255);
  line(a.x, a.y, a.z, b.x, b.y, b.z);
}
