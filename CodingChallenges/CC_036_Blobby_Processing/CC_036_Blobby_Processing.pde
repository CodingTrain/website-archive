// Coding Train
// Ported to processing by Max (https://github.com/TheLastDestroyer)
// Origional JS by Daniel Shiffman
// http://patreon.com/codingtrain
// Code for this video: https://youtu.be/Cl_Gjj80gPE

float yoff = 0;
float a_step = 0.1;
float xoff_step = 0.1;
float yoff_step = 0.01;

void setup(){
  size(400,400);
}

void draw(){
  background(0);
  translate(width/2, height/2);
  int radius = 150;
  
  beginShape();
  float xoff = 0;
  for (float a =0; a < TWO_PI; a += a_step){
    float offset = map(noise(xoff, yoff), 0, 1, -25, 25);
    float r = radius + offset;
    float x = r * cos(a);
    float y = r * sin(a);
    
    vertex(x,y);
    xoff += xoff_step;
  }
  endShape();
  yoff += yoff_step;
}
