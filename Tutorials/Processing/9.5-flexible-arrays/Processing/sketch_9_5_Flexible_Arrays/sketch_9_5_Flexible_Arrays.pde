// Arrays of Flexible Size
// Learning Processing
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/Courses/learning-processing/9-arrays/9.5-flexible-arrays.html
// https://youtu.be/Hf-AHwRaodA

Bubble[] bubbles = new Bubble[100];
int total = 0;

void setup() {
  size(640, 360);
  for (int i = 0; i < bubbles.length; i++) {
    bubbles[i] = new Bubble(random(20, 40));
  }
}

void mousePressed() {
  total = total + 1;
}

void keyPressed() {
  total = total - 1;
}

void draw() {
  background(255);
  for (int i = 0; i < total; i++) {
    bubbles[i].ascend();
    bubbles[i].display();
    bubbles[i].top();
  }
}
