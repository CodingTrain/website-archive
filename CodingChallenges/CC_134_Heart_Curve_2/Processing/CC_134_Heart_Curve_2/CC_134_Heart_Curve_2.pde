// Heart Curve
// Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/134.2-heart-curve-gif-loop.html
// https://youtu.be/l5I3Q1JFISE
// https://editor.p5js.org/codingtrain/sketches/C0kJ-BjYW
// I <3 you

int totalFrames = 120;
int counter = 0;
boolean record = false;

ArrayList<PVector> heart = new ArrayList<PVector>();
float a = 0;

void setup() {
  size(400, 400);
}

void draw() {
  float percent = 0;
  if (record) {
    percent = float(counter) / totalFrames;
  } else {
    percent = float(counter % totalFrames) / totalFrames;
  }
  render(percent);
  if (record) {
    saveFrame("output/gif-"+nf(counter, 3)+".png");
    if (counter == totalFrames-1) {
      exit();
    }
  }
  counter++;
}

void render(float percent) {
  background(0);
  translate(width/2, height/2);
  stroke(255);
  strokeWeight(4);
  fill(150, 0, 100);
  beginShape();
  for (PVector v : heart) {
    float a = map(percent, 0, 1, 0, TWO_PI*2);
    float r = map(sin(a), -1, 1, height/80, height/40);
    vertex(r * v.x, r * v.y);
  }
  endShape();


  if (percent < 0.5) {
    a = map(percent, 0, 0.5, 0, TWO_PI);
    float x = 16 * pow(sin(a), 3);
    float y = -(13 * cos(a) - 5*cos(2*a) - 2*cos(3*a)- cos(4*a));
    heart.add(new PVector(x, y));
  } else {
    heart.remove(0);
  }
  
}
