// Marching Squares Webcam
// Coding in the Cabana
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/challenges/coding-in-the-cabana/005-marching-squares.html
// https://youtu.be/0ZONMNUKTfU
// p5 port: https://editor.p5js.org/codingtrain/sketches/

import processing.video.*;

float[][] field;
int rez = 20;
int cols, rows;

Capture cam;

void captureEvent(Capture c) {
  c.read();
}

void setup() {
  size(1280, 720);
  String[] cameras =   Capture.list();
  printArray(cameras);
  cam = new Capture(this, cameras[0]);
  cam.start();
  cols = width / rez;
  rows = height / rez;
  field = new float[cols][rows];
}

void line(PVector v1, PVector v2) {
  line(v1.x, v1.y, v2.x, v2.y);
}

void draw() {
  image(cam, 0, 0, width, height);
  float threshold = 245;
  loadPixels();
  for (int i = 0; i < cols; i++) {
    for (int j = 0; j < rows; j++) {
      int x = i * rez;
      int y = j * rez;
      color c = pixels[x+y*width];
      float b = brightness(c);
      field[i][j] = b;
      fill(b);
      noStroke();
      rect(x, y, rez, rez);
    }
  }

  for (int i = 0; i < cols-1; i++) {
    for (int j = 0; j < rows-1; j++) {
      float x = i * rez;
      float y = j * rez;
      PVector a = new PVector(x + rez * 0.5, y            );
      PVector b = new PVector(x + rez, y + rez * 0.5);
      PVector c = new PVector(x + rez * 0.5, y + rez      );
      PVector d = new PVector(x, y + rez * 0.5);

      // float threshold = 230;//map(mouseX, 0, width, 0, 255);
      int c1 = field[i][j] < threshold ? 0 : 1;
      int c2 = field[i+1][j] < threshold ? 0 : 1;
      int c3 = field[i+1][j+1]  < threshold ? 0 : 1;
      int c4 = field[i][j+1] < threshold ? 0 : 1;


      int state = getState(c1, c2, c3, c4);
      stroke(0);
      strokeWeight(4);
      switch (state) {
      case 1:  
        line(c, d);
        break;
      case 2:  
        line(b, c);
        break;
      case 3:  
        line(b, d);
        break;
      case 4:  
        line(a, b);
        break;
      case 5:  
        line(a, d);
        line(b, c);
        break;
      case 6:  
        line(a, c);
        break;
      case 7:  
        line(a, d);
        break;
      case 8:  
        line(a, d);
        break;
      case 9:  
        line(a, c);
        break;
      case 10: 
        line(a, b);
        line(c, d);
        break;
      case 11: 
        line(a, b);
        break;
      case 12: 
        line(b, d);
        break;
      case 13: 
        line(b, c);
        break;
      case 14: 
        line(c, d);
        break;
      }
    }
  }
}



int getState(int a, int b, int c, int d) {
  return a * 8 + b * 4  + c * 2 + d * 1;
}
