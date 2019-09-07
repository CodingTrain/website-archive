
// Rubiks Cube 1
// Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/142.1-rubiks-cube.html
// https://youtu.be/9PGfL4t-uqE

import peasy.*;

PeasyCam cam;

// UP, DOWN, RIGHT, LEFT, FRONT, BACK
final int UPP = 0;
final int DWN = 1;
final int RGT = 2;
final int LFT = 3;
final int FRT = 4;
final int BCK = 5;

color[] colors = {
  #FFFFFF, #FFFF00, 
  #FFA500, #FF0000, 
  #00FF00, #0000FF
};

int dim = 3;
Cubie[][][] cube = new Cubie[dim][dim][dim];

void setup() {
  size(600, 600, P3D); 
  cam = new PeasyCam(this, 400);
  for (int i = 0; i < dim; i++) {
    for (int j = 0; j < dim; j++) {
      for (int k = 0; k < dim; k++) {
        float len = 50;
        float offset = (dim - 1)* len * 0.5;
        float x = len * i - offset;
        float y = len * j - offset;
        float z = len * k - offset;
        cube[i][j][k] = new Cubie(x, y, z, len);
      }
    }
  }
}

void draw() {
  background(51); 
  for (int i = 0; i < dim; i++) {
    for (int j = 0; j < dim; j++) {
      for (int k = 0; k < dim; k++) {
        cube[i][j][k].show();
      }
    }
  }
}
