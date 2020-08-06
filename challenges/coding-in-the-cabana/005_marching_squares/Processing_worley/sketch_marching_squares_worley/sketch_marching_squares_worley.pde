// Marching Squares Worley Noise
// Coding in the Cabana
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/challenges/coding-in-the-cabana/005-marching-squares.html
// https://youtu.be/0ZONMNUKTfU
// p5 port: https://editor.p5js.org/codingtrain/sketches/JzvYF8WwT

PVector[] points = new PVector[150];
float[][] field;
int rez = 10;
int cols, rows;

void setup() {
  size(1280, 720);
  cols = 1 + width / rez;
  rows = 1 + height / rez;
  field = new float[cols][rows];
  for (int i = 0; i < points.length; i++) {
    points[i] = new PVector(random(cols), random(rows), random(cols));
  }
}

void line(PVector v1, PVector v2) {
  line(v1.x, v1.y, v2.x, v2.y);
}

void draw() {
  background(0); 
  for (int i = 0; i < cols; i++) {
    for (int j = 0; j < rows; j++) {
      float[] distances = new float[points.length];
      for (int n = 0; n < points.length; n++) {
        PVector v = points[n];
        float z = frameCount % cols;
        float d = dist(i, j, z, v.x, v.y, v.z);
        distances[n] = d;
      }
      float[] sorted = sort(distances);
      field[i][j] = sorted[1];
    }
  }
  float factor = 5;
  for (int i = 0; i < cols; i++) {
    for (int j = 0; j < rows; j++) {
      fill(field[i][j]*factor);
      noStroke();
      rect(i*rez, j*rez, rez, rez);
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
      
      float threshold = 70;
      int c1 = field[i][j] * factor < threshold ? 0 : 1;
      int c2 = field[i+1][j] * factor < threshold ? 0 : 1;
      int c3 = field[i+1][j+1] * factor < threshold ? 0 : 1;
      int c4 = field[i][j+1] * factor < threshold ? 0 : 1;


      int state = getState(c1, c2, c3, c4);
      stroke(255);
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
