// Superellipse
// Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/019-superellipse.html
// https://youtu.be/z86cx2A4_3E
// https://editor.p5js.org/codingtrain/sketches/Hk-1AMTgN
// Processing transcription: Chuck England

Slider slider;

void setup() {
  size(400, 400);
  slider = new Slider(-width/2+20, -height/2+20, 0, 10, 2, 0.01);
}

void draw() {
  background(51);
  translate(width / 2, height / 2);

  float a = 100;
  float b = 100;
  float n = slider.value();
  //float n = 2;
  stroke(255);
  noFill();

  beginShape();
  for (float angle = 0; angle < TWO_PI; angle += 0.1) {
    // Simple ellipse
    // float x = r * cos(angle);
    // float y = r * sin(angle);

    // Superellipse
    float na = 2 / n;
    float x = pow(abs(cos(angle)), na) * a * sgn(cos(angle));
    float y = pow(abs(sin(angle)), na) * b * sgn(sin(angle));
    vertex(x, y);
  }
  endShape(CLOSE);

  slider.show();
}

float sgn(float val) {
  if (val == 0) {
    return 0;
  }
  return val / abs(val);
}
