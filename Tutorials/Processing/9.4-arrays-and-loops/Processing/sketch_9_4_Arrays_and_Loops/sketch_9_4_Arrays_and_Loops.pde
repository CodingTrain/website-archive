// Arrays and Loops
// Learning Processing
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/Courses/learning-processing/9-arrays/9.4-arrays-and-loops.html
// https://youtu.be/am6e1U2BHkA

Bubble[] bubbles = new Bubble[300];

void setup() {
  size(640, 360);
  for (int i = 0; i < bubbles.length; i++) {
    bubbles[i] = new Bubble(random(60));
  }
}

void draw() {
  background(255);
  for (int i = 0; i < bubbles.length; i++) {
    bubbles[i].ascend();
    bubbles[i].display();
    bubbles[i].top();
  }
}
