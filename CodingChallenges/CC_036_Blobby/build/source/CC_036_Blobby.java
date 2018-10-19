import processing.core.*; 
import processing.data.*; 
import processing.event.*; 
import processing.opengl.*; 

import java.util.HashMap; 
import java.util.ArrayList; 
import java.io.File; 
import java.io.BufferedReader; 
import java.io.PrintWriter; 
import java.io.InputStream; 
import java.io.OutputStream; 
import java.io.IOException; 

public class CC_036_Blobby extends PApplet {

// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for this video: https://youtu.be/Cl_Gjj80gPE

float yoff = 0.0f;

public void setup() {
  
}

public void draw() {
  background(0);

  translate(width / 2, height / 2);

  float radius = 150;

  beginShape();
  float xoff = 0;
  for (float a = 0; a < TWO_PI; a += 0.1f) {
    float offset = map(noise(xoff, yoff), 0, 1, -25, 25);
    float r = radius + offset;
    float x = r * cos(a);
    float y = r * sin(a);
    vertex(x, y);
    xoff += 0.1f;
    //ellipse(x, y, 4, 4);
  }
  endShape();

  yoff += 0.01f;
}
  public void settings() {  size(400, 400); }
  static public void main(String[] passedArgs) {
    String[] appletArgs = new String[] { "--present", "--window-color=#666666", "--stop-color=#cccccc", "CC_036_Blobby" };
    if (passedArgs != null) {
      PApplet.main(concat(appletArgs, passedArgs));
    } else {
      PApplet.main(appletArgs);
    }
  }
}
