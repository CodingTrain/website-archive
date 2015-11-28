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

