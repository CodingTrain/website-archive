// Daniel Shiffman
// http://codingtra.in
// Butterfly Wings
// Video: https://youtu.be/O_0fRV4MTZo
// Processing transcription: Chuck England

float yoff = 0;

void setup() {
  size(400, 400);
}

void draw() {
  background(51);
  translate(width / 2, height / 2);
  //rotate(PI / 2);

  stroke(255);
  fill(255, 50);
  strokeWeight(1);

  float da = PI / 200;
  float dx = 0.05;

  float xoff = 0;
  beginShape();
  for (float a = 0; a <= TWO_PI; a += da) {
    float n = noise(xoff, yoff);
    float r = sin(2 * a) * map(n, 0, 1, 50, 300);
    float x = r * cos(a);
    float y = r * sin(a);
    if (a < PI){
        xoff += dx; 
    } else{
        xoff -= dx; 
    }
    //point(x, y);
    vertex(x, y);
  }
  endShape();

  yoff += 0.01;
}
