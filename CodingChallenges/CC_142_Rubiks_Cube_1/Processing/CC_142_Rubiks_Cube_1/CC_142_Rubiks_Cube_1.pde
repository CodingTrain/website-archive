import peasy.*;


// Rubiks Cube 1
// Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/142.1-rubiks-cube.html
// https://youtu.be/9PGfL4t-uqE

import peasy.*;

PeasyCam cam;

enum Color{
  UP(#FFFFFF), DOWN(#FFFF00),
  RIGHT(#FFA500), LEFT(#FF0000), 
  FRONT(#00FF00), BACK(#0000FF);
  private color value;
  
  public color getValue(){
    return this.value;
  }
  
  private Color(color value){
    this.value = value;
  }
}

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
