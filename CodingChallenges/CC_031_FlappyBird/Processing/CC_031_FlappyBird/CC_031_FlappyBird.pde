// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/cXgA1d_E-jY

Bird b;
int wid = 400;
int rez = 20;
int score = 0;
boolean jumping = false;
PVector gravity = new PVector(0, 0.5);
ArrayList<Pipe> pipes = new ArrayList<Pipe>();

void setup() {
  size(400, 800);
  b = new Bird();
  pipes.add(new Pipe());
}

void draw() {
  background(0);

  if (frameCount % 75 == 0) {
    pipes.add(new Pipe());
  }

  if (keyPressed) {
    PVector up = new PVector(0, -5);
    b.applyForce(up);
  }

  b.update();
  b.show();
  boolean safe = true;

  for (int i = pipes.size() - 1; i >= 0; i--) {
    Pipe p = pipes.get(i);
    p.update();
    
    if (p.hits(b)) {
      p.show(true);
      safe = false;
    } else {
      p.show(false);
    }

    if (p.x < -p.w) {
      pipes.remove(i);
    }
  }
  
  if (safe) {
    score++; 
  } else {
    score -= 50;
  }
  
  fill(255, 0, 255);
  textSize(64);
  text(score, width/2, 50);
  score = constrain(score, 0, score);
}
