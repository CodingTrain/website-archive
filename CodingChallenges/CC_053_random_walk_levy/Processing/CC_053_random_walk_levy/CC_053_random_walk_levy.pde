// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Video: https://youtu.be/bqF9w9TTfeo
// Processing transcription: Chuck England

// int x;
// int y;
PVector pos;
PVector prev;

void setup() {
  size(400, 400);
  background(51);
  pos = new PVector(200, 200);
  prev = pos.copy();
  println(pos.x, pos.y);
}

void draw() {
  stroke(255);
  strokeWeight(2);
  //point(pos.x, pos.y);
  line(pos.x, pos.y, prev.x, prev.y);
  prev.set(pos);

  PVector step = PVector.random2D();

  float r = random(100);
  if (r < 1) {
    step.mult(random(25, 100));
  } else {
    step.setMag(2);
  }

  //pos = pos + step;
  pos.add(step);
}
