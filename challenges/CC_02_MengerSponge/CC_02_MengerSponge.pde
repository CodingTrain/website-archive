// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for this video: https://youtu.be/LG8ZK-rRkXo

float a = 0;

ArrayList<Box> sponge;
void setup() {
  size(400, 400, P3D);

  // An array of Box objects
  sponge = new ArrayList<Box>();

  // Star with one
  Box b = new Box(0, 0, 0, 200);
  sponge.add(b);
}
void mousePressed() {
  // Generate the next set of boxes
  ArrayList<Box> next = new ArrayList<Box>();
  for (Box b : sponge) {
    ArrayList<Box> newBoxes = b.generate();
    next.addAll(newBoxes);
  }
  sponge = next;
}

void draw() {
  background(51);
  stroke(255);
  noFill();
  lights();
  translate(width/2, height/2);
  rotateX(a);
  rotateY(a*0.4);
  rotateZ(a*0.1);
  // Show what you've got!
  for (Box b : sponge) {
    b.show();
  }
  a += 0.01;
}
