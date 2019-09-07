// Coding Train
// Ported to processing by Max (https://github.com/TheLastDestroyer)
// Origional JS by Daniel Shiffman
// http://patreon.com/codingtrain
// Code for: https://youtu.be/0jjeOYMjmDU


float angle = 45;
float branch_ratio = 0.67;


void setup(){
  size(400,400);
}

void draw(){
  background(51);
  stroke(255);
  translate(width/2, height);
  branch(100);
}

void branch(float len){
  line(0,0,0,-len);
  translate(0, -len);
  if (len > 4){
    pushMatrix();
    rotate(angle);
    branch(len * branch_ratio);
    popMatrix();
    pushMatrix();
    rotate(-angle);
    branch(len * branch_ratio);
    popMatrix();
  }
}
 void mouseWheel(MouseEvent event){
   angle += event.getCount()/10.0;
 }
