// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain

// Circle Morphing Part 1
// Video: https://youtu.be/u2D4sxh3MTs

// Originally written using p5.js

ArrayList<PVector> cirPath;
ArrayList<PVector> triPath;
int spacing = 10;
float theta = 0;

PVector polarToCartesian(float r, float angle) {
  return new PVector(r * cos(radians(angle)), r * sin(radians(angle)));
}

void setup() {
  size(400, 400);

  cirPath = new ArrayList<PVector>();
  triPath = new ArrayList<PVector>();
  
  float radius = 100;
  int startA = 0;
  int endA = 120;
  PVector start = polarToCartesian(radius, startA);
  PVector end = polarToCartesian(radius, endA);
  for (int a = startA; a < 360; a += spacing) {
    PVector cv = polarToCartesian(radius, a);
    cirPath.add(cv);
    float amt = float(a % 120) / (endA - startA);
    PVector tv = PVector.lerp(start, end, amt);
    triPath.add(tv);

    if ((a + spacing) % 120 == 0) {
      startA = startA + 120;
      endA = endA + 120;
      start = polarToCartesian(radius, startA);
      end = polarToCartesian(radius, endA);
    }
  }

}

void draw() {
  background(220);
  translate(width / 2, height / 2);
  rotate(radians(30));
  stroke(0);
  strokeWeight(4);
  noFill();
  float amt = (sin(radians(theta)) + 1) / 2;
  theta += 5;
  beginShape();
  for (int i = 0; i < cirPath.size(); i++) {
    PVector cv = cirPath.get(i);
    PVector tv = triPath.get(i);
    float x = lerp(cv.x, tv.x, amt);
    float y = lerp(cv.y, tv.y, amt);
    vertex(x, y);
  }
  endShape(CLOSE);


   //beginShape();
   //for (int i = 0; i < cirPath.size(); i++) {
   //  PVector v = cirPath.get(i);
   //  vertex(v.x, v.y);
   //}
   //endShape(CLOSE);
   //beginShape();
   //for (int i = 0; i < triPath.size(); i++) {
   //  PVector v = triPath.get(i);
   //  vertex(v.x, v.y);
   //}
   //endShape(CLOSE);
   //
   //for (int i = 0; i < triPath.size(); i++) {
   //  PVector v = triPath.get(i);
   //  fill(0);
   //  ellipse(v.x, v.y, 8, 8);
   //}

}