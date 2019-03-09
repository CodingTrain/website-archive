// Daniel Shiffman
// http://codingtra.in

// Visualizing the Digits of Pi
// https://youtu.be/WEd_UIKG-uc
// https://thecodingtrain.com/CodingChallenges/096-visualizing-pi.html

String pi;
int[] digits;
int[] counts = new int[10];
int index = 0;

void setup() {
  size(420, 420);
  pi = loadStrings("pi-1million.txt")[0];

  //println(pi.length());
  String[] sdigits = pi.split("");

  //println(sdigits.length);
  digits = int(sdigits);

  //printArray(digits);
  background(0);
  stroke(255);
  noFill();
  translate(width/2, height/2);
  ellipse(0,0,400,400);
}

void draw() {
  
  translate(width/2, height/2);
  
  int digit = digits[index];
  int nextDigit = digits[index+1];
  index++;
  
  float diff = TWO_PI/10;
  
  float a1 = map(digit,0,10,0,TWO_PI) + random(-diff,diff);
  float a2 = map(nextDigit,0,10,0,TWO_PI) + random(-diff,diff);
  
  float x1 = 200 * cos(a1);
  float y1 = 200 * sin(a1);
  
  float x2 = 200 * cos(a2);
  float y2 = 200 * sin(a2);
  
  stroke(255,50);
  line(x1,y1,x2,y2);

}
