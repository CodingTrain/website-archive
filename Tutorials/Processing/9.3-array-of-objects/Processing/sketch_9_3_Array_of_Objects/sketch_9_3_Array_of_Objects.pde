// Array of Objects
// Learning Processing
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/Courses/learning-processing/9-arrays/9.3-array-of-objects.html
// https://youtu.be/-sSRHRfK2EU

Bubble[] bubbles = new Bubble[2];

void setup() {
  size(640, 360);
  bubbles[0] = new Bubble(64);
  bubbles[1] = new Bubble(64);
}

void draw() {
  background(255);
  bubbles[0].ascend();
  bubbles[0].display();
  bubbles[0].top();

  bubbles[1].ascend();
  bubbles[1].display();
  bubbles[1].top();
}
