// GIF Loop
// Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/135-gif-loop.html
// https://youtu.be/nBKwCCtWlUg

int totalFrames = 120;
int counter = 0;
boolean record = false;

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
  float angle = map(percent, 0, 1, 0, TWO_PI);
  background(0);
  translate(width/2, height/2);
  rotate(angle);
  stroke(255);
  noFill();
  rectMode(CENTER);
  square(0, 0, 100);
}
