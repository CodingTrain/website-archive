// Daniel Shiffman
// Code for: https://youtu.be/G2hI9XL6oyk
// GOL from http://natureofcode.com

GOL gol;

boolean recording = false;

void setup() {
  size(640, 360);
  gol = new GOL();
}

void keyPressed() {
  if (key == 'r' || key == 'R') {
    recording = !recording;
  }
}

void draw() {
  background(255);
  gol.generate();
  gol.display();

  if (recording) {
    saveFrame("output/gol_####.png");    
    fill(255, 0, 0);
  } else {
    fill(0, 255, 0);
  }
  
  ellipse(width/2, height-50, 20, 20);
  // println(frameRate);
}