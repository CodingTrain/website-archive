Bubble b1;
Bubble b2;

void setup() {
  size(640, 360);
  b1 = new Bubble(64);
  b2 = new Bubble(128);
}

void draw() {
  background(255);
  b1.ascend();
  b1.display();
  b1.top();

  b2.ascend();
  b2.display();
  b2.top();
}

void mousePressed() {
  b1.clicked(mouseX, mouseY);
  b2.clicked(mouseX, mouseY);
}