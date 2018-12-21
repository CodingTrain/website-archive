// Fourier Series
// Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/125-fourier-series.html
// https://youtu.be/Mm2eYfj0SgA
// https://editor.p5js.org/codingtrain/sketches/SJ02W1OgV

float time = 0;
FloatList wave;

int n = 5;

void setup() {
  size(600, 400);
  wave = new FloatList();
}

void draw() {
  background(0);
  translate(150, 200);

  float x = 0;
  float y = 0;

  for (int i = 0; i < n; i++) {
    float prevx = x;
    float prevy = y;

    float n = i * 2 + 1;
    float radius = 75 * (4 / (n * PI));
    x += radius * cos(n * time);
    y += radius * sin(n * time);

    stroke(255, 100);
    noFill();
    ellipse(prevx, prevy, radius * 2, radius * 2);

    //fill(255);
    stroke(255);
    line(prevx, prevy, x, y);
    //ellipse(x, y, 8);
  }

  wave.insert(0, y);

  translate(200, 0);
  line(x - 200, y, 0, wave.get(0));
  beginShape();
  noFill();
  for (int i = 0; i < wave.size(); i++) {
    vertex(i, wave.get(i));
  }
  endShape();

  time += 0.05;

  if (wave.size() > 250) {
    for (int n = 250; n < wave.size(); n++) {
      wave.remove(n);
    }
  }
}
