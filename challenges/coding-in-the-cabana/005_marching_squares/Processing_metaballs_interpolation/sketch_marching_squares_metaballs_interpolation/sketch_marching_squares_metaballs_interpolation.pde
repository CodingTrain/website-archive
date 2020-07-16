// Marching Squares Metaballs Interpolation
// Coding in the Cabana
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/challenges/coding-in-the-cabana/005-marching-squares.html
// https://youtu.be/0ZONMNUKTfU
// p5 port: https://editor.p5js.org/codingtrain/sketches/hEB4588QC

Bubble[] bubbles = new Bubble[16];
float[][] field;
int rez = 10;
int cols, rows;

void setup() {
  size(1280, 720);
  cols = 1 + width / rez;
  rows = 1 + height / rez;
  field = new float[cols][rows];
  for (int i = 0; i < bubbles.length; i++) {
    bubbles[i] = new Bubble();
  }
}

void line(PVector v1, PVector v2) {
  line(v1.x, v1.y, v2.x, v2.y);
}

void draw() {
  background(0); 



  for (int i = 0; i < cols; i++) {
    for (int j = 0; j < rows; j++) {
      float sum = 0;
      float x = i * rez;
      float y = j * rez;
      for (Bubble b : bubbles) {
        sum += b.r*b.r / ((x-b.x)*(x-b.x) + (y-b.y)*(y-b.y));
      }
      field[i][j] = sum;
    }
  }
  //for (int i = 0; i < cols; i++) {
  //  for (int j = 0; j < rows; j++) {
  //    fill(field[i][j]*255);
  //    noStroke();
  //    rect(i*rez, j*rez, rez, rez);
  //  }
  //}

  for (Bubble b : bubbles) {
    b.update();
    b.show();
  }


  for (int i = 0; i < cols-1; i++) {
    for (int j = 0; j < rows-1; j++) {
      float x = i * rez;
      float y = j * rez;
      
      // interpolation
       float threshold = 1;
      int c1 = field[i][j]  < threshold ? 0 : 1;
      int c2 = field[i+1][j]  < threshold ? 0 : 1;
      int c3 = field[i+1][j+1]  < threshold ? 0 : 1;
      int c4 = field[i][j+1]  < threshold ? 0 : 1;
      int state = getState(c1, c2, c3, c4);
      stroke(255);
      strokeWeight(2);
      float a_val = field[i][j];
      float b_val = field[i+1][j];
      float c_val = field[i+1][j+1];
      float d_val = field[i][j+1];      

      PVector a = new PVector();
      float amt = (1 - a_val) / (b_val - a_val);
      a.x = lerp(x, x + rez, amt);
      a.y = y;

      PVector b = new PVector();
      amt = (1 - b_val) / (c_val - b_val);
      b.x = x + rez;
      b.y = lerp(y, y + rez, amt);

      PVector c = new PVector();
      amt = (1 - d_val) / (c_val - d_val);
      c.x = lerp(x, x + rez, amt);
      c.y = y + rez;


      PVector d = new PVector();
      amt = (1 - a_val) / (d_val - a_val);
      d.x = x;
      d.y = lerp(y, y + rez, amt);

      stroke(255);
      strokeWeight(2);
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
