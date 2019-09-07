// Heart Curve
// Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/134-heart-curve.html
// https://youtu.be/oUBAi9xQ2X4
// https://editor.p5js.org/codingtrain/sketches/egvieHyt0
// I <3 you

ArrayList<PVector> heart = new ArrayList<PVector>();
float a = 0;
void setup() {
  //size(400, 400);
  fullScreen();
}


void draw() {
  background(0);
  translate(width/2, height/2);

  stroke(255);
  strokeWeight(2);
  fill(150, 0, 100);
  beginShape();
  for (PVector v : heart) {
    vertex(v.x, v.y);
  }
  endShape();

  float r = height/40;
  float x =  r * 16 * pow(sin(a), 3);
  float y = -r * (13 * cos(a) - 5 * cos(2 * a) - 2 * cos(3 * a)- cos(4 * a));
  heart.add(new PVector(x, y));
  
  // So that it stops
  if (a > TWO_PI) {
    noLoop();
  }

  a += 0.1;
}
