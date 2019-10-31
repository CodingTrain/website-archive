// Maurer Rose
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/CodingInTheCabana/002-collatz-conjecture.html
// https://youtu.be/4uU9lZ-HSqA
// https://editor.p5js.org/codingtrain/sketches/qa7RiptE9


float n = 0;
float d = 0;
// let dSlider;

void setup() {
  size(400, 400);
}

void draw() {
  background(0);
  translate(width/2,height/2);
  stroke(255);
  //d = dSlider.value();
  noFill();
  beginShape();
  strokeWeight(1);
  for (float i = 0; i < 361; i++) {
    float k = i * d;
    float r = 150 * sin(radians(n*k));
    float x = r * cos(radians(k));
    float y = r * sin(radians(k));
    vertex(x,y);
  }
  endShape();

  noFill();
  stroke(255,0,255, 255);
  strokeWeight(4);
  beginShape();
  for (float i = 0; i < 361; i++) {
    float k = i;
    float r = 150 * sin(radians(n*k));
    float x = r * cos(radians(k));
    float y = r * sin(radians(k));
    vertex(x,y);
  }
  endShape();

  n += 0.001;
  d += 0.003;



}
